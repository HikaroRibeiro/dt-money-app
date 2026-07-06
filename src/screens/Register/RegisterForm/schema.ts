import * as yup from "yup";

export const registerSchema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais").required("A senha é obrigatória"),
});