import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  Flex,
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { BiHide, BiShow } from "react-icons/bi";
import "./Login.scss";

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

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

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              errorBorderColor="crimson"
              placeholder="Введите пароль"
              isInvalid={Boolean(errors.password?.message)}
              {...register("password", { required: "Укажите пароль" })}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                background="transparent"
              >
                {show ? <BiShow size="18px" /> : <BiHide size="18px" />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Button disabled={!isValid} type="submit" colorScheme="blue">
          Войти
        </Button>
      </form>
    </Flex>
  );
};
