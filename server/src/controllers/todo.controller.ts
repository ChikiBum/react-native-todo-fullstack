import { ITodo } from "./../types/todos.type";
import TodoService from "../services/todo.service";
import { TypedRequestParams, IRequestTodo } from "./../types/requests.type";
export class TodoController {
    constructor(private todoService: TodoService) {}

    async getAllTodo(req: any ) {
        const userId = req.user._id;
        return await this.todoService.getAll(userId, req.query);
    }

    async findOne(req: TypedRequestParams<{ id: string }, {}, {}>) {
        const { id } = req.params;
        return await this.todoService.findById(id);
    }

    async createNewTodo(req: IRequestTodo) {
        const newTodo: ITodo = { authorId: req.user.id, ...req.body };
        return await this.todoService.createTodo(newTodo);
    }

    async updateOne(req: TypedRequestParams<{ id: string }, {}, ITodo>) {
        const { id } = req.params;
        const newTodoData = req.body;
        return await this.todoService.updateTodo(id, newTodoData);
    }

    async deleteOne(req: TypedRequestParams<{id: string}, { userId: string }, {}>) {
        const { userId } = req.query;
        const { id } = req.params;
        return await this.todoService.deleteTodo(id, userId);
    }
}

const todoController = new TodoController(new TodoService());
export default todoController;
