import * as Yup from "yup";

export interface IAuth {
    email: string;
    password: string;
}

export const AuthSchema = Yup.object().shape({
    email: Yup.string()
        .email('Example email@mail.com')
        .required('No email provided.'),
    password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Min 8 chars.')
        // .matches(/[a-zA-Z]/, 'Only Latin letters.')
});
