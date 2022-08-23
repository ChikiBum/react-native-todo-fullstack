import * as Yup from "yup";

export interface ITodo {
    _id: string;
    title: string;
    description: string;
    year: number;
    completed: boolean;
    public: boolean;
}

export type TodoQueryParams = {
    isCopleted: boolean;
    todoTitle: string;
    startIndex: number;
    endIndex: number;
};

export const TodoSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title min 3 symbols")
        .max(30, "Title max 30 symbols")
        .required("Title is required"),
    year: Yup.number()
        .integer()
        .min(2022, "Min year 2022")
        .max(2070, "Max year 2070")
        .required("Year is required"),
    description: Yup.string()
        .min(5, "Description min 3 symbols")
        .max(150, "Description max 150 symbols")
        .required("Description is required"),
});
