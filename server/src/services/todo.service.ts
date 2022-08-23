import { TodoModel } from "../models/todo.model";
import { ITodo } from "../types/todos.type";
import { ISearchQuery } from "../types/requests.type";

export default class TodoService {
    async getAll(userId: string, query: ISearchQuery) {
        const { isCompleted, todoTitle, startIndex, endIndex } = query;
        const getDataQuery = {
            $and: [
                {
                    title: { $regex: todoTitle },
                    completed: isCompleted,
                },
                { $or: [{ authorId: userId }, { public: false }] },
            ] };
        const dataCount = await TodoModel.countDocuments(getDataQuery).exec();
        const todoData = await TodoModel.find(getDataQuery).skip(Number(startIndex))
            .limit(Number(endIndex));
        return { todoData, dataCount };
    }

    async createTodo(newTodo: ITodo) {
        const todoItem = await TodoModel.create(newTodo);
        return todoItem;
    }

    async findById(id: string) {
        const todoTtem = await TodoModel.findById({ _id: id });
        return todoTtem;
    }

    async updateTodo(id: string, todo: ITodo) {
        const todoTtem = await TodoModel.findByIdAndUpdate(id, todo, { new: true });
        return todoTtem;
    }

    async deleteTodo(id: string, userId: any) {
        await TodoModel.deleteOne({ _id: id });
        const data = await TodoModel.find({
            author: userId,
        });
        return data;
    }
}
