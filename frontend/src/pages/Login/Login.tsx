import { Navigate } from "react-router-dom";
import {
  Button,
  Flex,
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import "./Login.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmitForm = async (values: FormValues) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading as="h2" fontWeight="500" mb="30px">
        Вход в аккаунт
      </Heading>
      <form onSubmit={handleSubmit(onSubmitForm)} className="login__form">
        <FormControl mb="15px">
          <FormLabel mb="5px">Почта</FormLabel>
          <Input
            placeholder="Введите почту"
            isInvalid={Boolean(errors.email?.message)}
            errorBorderColor="crimson"
            {...register("email", { required: "Укажите почту" })}
            type="email"
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
        <FormControl mb="25px">
          <FormLabel mb="5px">Пароль</FormLabel>
          <Input
            errorBorderColor="crimson"
            placeholder="Введите пароль"
            isInvalid={Boolean(errors.password?.message)}
            {...register("password", { required: "Укажите пароль" })}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Button disabled={!isValid} type="submit" colorScheme="blue">
          Войти
        </Button>
      </form>
    </Flex>
  );
};
