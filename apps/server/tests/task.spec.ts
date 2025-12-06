import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "bun:test";
import { db, eq, sql } from "@task-tracker-app/db";
import { user } from "@task-tracker-app/db/schema/auth";
import { task } from "@task-tracker-app/db/schema/task";
import request from "supertest";
import app from "@/index";

const MOCK_USER_ID = "LWat6JtmvAleTJ9lGckngj4Xjg3bKj9J";

describe("Task API", () => {
	beforeAll(async () => {
		const [existingMockUser] = await db
			.select()
			.from(user)
			.where(eq(user.id, MOCK_USER_ID));
		if (!existingMockUser) {
			await db.insert(user).values({
				id: MOCK_USER_ID,
				name: "Test User",
				email: "test@example.com",
				emailVerified: true,
			});
		}
	});

	beforeEach(async () => {
		await db.execute(sql`TRUNCATE TABLE ${task} RESTART IDENTITY CASCADE`);
	});

	afterAll(async () => {
		await db.execute(sql`TRUNCATE TABLE ${task} RESTART IDENTITY CASCADE`);
	});

	describe("POST /api/v1/tasks - Create Task", () => {
		it("should create a new task", async () => {
			const taskData = {
				title: "Test Task",
				description: "Test description",
				priority: "high" as const,
			};

			const res = await request(app).post("/api/v1/tasks").send(taskData);

			expect(res.status).toBe(201);
			expect(typeof res.body).toBe("string");

			const [createdTask] = await db
				.select()
				.from(task)
				.where(eq(task.id, res.body));

			expect(createdTask).toBeDefined();
			if (!createdTask) throw new Error("Task not created");
			expect(createdTask.title).toBe(taskData.title);
			expect(createdTask.description).toBe(taskData.description);
			expect(createdTask.priority).toBe(taskData.priority);
		});
	});

	describe("GET /api/v1/tasks - Get All Tasks", () => {
		beforeEach(async () => {
			await db.insert(task).values([
				{
					title: "Task 1",
					priority: "high",
					status: "todo",
					userId: MOCK_USER_ID,
				},
				{
					title: "Task 2",
					priority: "medium",
					status: "in_progress",
					userId: MOCK_USER_ID,
				},
			]);
		});

		it("should get all tasks", async () => {
			const res = await request(app).get("/api/v1/tasks");

			expect(res.status).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
			expect(res.body.length).toBe(2);
		});
	});

	describe("GET /api/v1/tasks/:id - Get One Task", () => {
		let taskId: string;

		beforeEach(async () => {
			const [createdTask] = await db
				.insert(task)
				.values({
					title: "Single Task",
					description: "Test description",
					priority: "high",
					status: "todo",
					userId: MOCK_USER_ID,
				})
				.returning();
			if (!createdTask) throw new Error("Failed to create test task");
			taskId = createdTask.id;
		});

		it("should get a task by id", async () => {
			const res = await request(app).get(`/api/v1/tasks/${taskId}`);

			expect(res.status).toBe(200);
			expect(res.body.id).toBe(taskId);
			expect(res.body.title).toBe("Single Task");
		});
	});

	describe("PUT /api/v1/tasks/:id - Update Task", () => {
		let taskId: string;

		beforeEach(async () => {
			const [createdTask] = await db
				.insert(task)
				.values({
					title: "Original Task",
					description: "Original description",
					priority: "low",
					status: "todo",
					userId: MOCK_USER_ID,
				})
				.returning();
			if (!createdTask) throw new Error("Failed to create test task");
			taskId = createdTask.id;
		});

		it("should update a task", async () => {
			const updateData = {
				title: "Updated Task",
				description: "Updated description",
				priority: "high" as const,
				status: "in_progress" as const,
			};

			const res = await request(app)
				.put(`/api/v1/tasks/${taskId}`)
				.send(updateData);

			expect(res.status).toBe(200);

			const [updatedTask] = await db
				.select()
				.from(task)
				.where(eq(task.id, taskId));

			expect(updatedTask).toBeDefined();
			if (!updatedTask) throw new Error("Task not found after update");
			expect(updatedTask.title).toBe(updateData.title);
			expect(updatedTask.description).toBe(updateData.description);
			expect(updatedTask.priority).toBe(updateData.priority);
			expect(updatedTask.status).toBe(updateData.status);
		});
	});

	describe("DELETE /api/v1/tasks/:id - Delete Task", () => {
		let taskId: string;

		beforeEach(async () => {
			const [createdTask] = await db
				.insert(task)
				.values({
					title: "Task to Delete",
					priority: "medium",
					status: "todo",
					userId: MOCK_USER_ID,
				})
				.returning();
			if (!createdTask) throw new Error("Failed to create test task");
			taskId = createdTask.id;
		});

		it("should delete a task", async () => {
			const res = await request(app).delete(`/api/v1/tasks/${taskId}`);

			expect(res.status).toBe(200);

			const [deletedTask] = await db
				.select()
				.from(task)
				.where(eq(task.id, taskId));

			expect(deletedTask).toBeUndefined();
		});
	});
});
