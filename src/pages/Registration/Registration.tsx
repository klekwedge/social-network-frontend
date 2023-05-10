import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import "./Registration.scss";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchRegister } from "../../redux/slices/auth";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

export const Registration = () => {
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
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
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
        Создание аккаунта
      </Heading>
      <Avatar w="90px" h="90px" mb="40px" />
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <FormControl mb="15px">
          <FormLabel mb="5px">Полное имя</FormLabel>
          <Input
            placeholder="Введите полное имя"
            isInvalid={Boolean(errors.fullName?.message)}
            errorBorderColor="crimson"
            {...register("fullName", { required: "Укажите полное имя" })}
          />
          <FormHelperText color="crimson">
            {errors.fullName?.message}
          </FormHelperText>
        </FormControl>
        <FormControl mb="15px">
          <FormLabel mb="5px">Почта</FormLabel>
          <Input
            placeholder="Введите почту"
            isInvalid={Boolean(errors.email?.message)}
            errorBorderColor="crimson"
            {...register("email", { required: "Укажите почту" })}
            type="email"
          />
          <FormHelperText color="crimson">
            {errors.email?.message}
          </FormHelperText>
        </FormControl>

        <FormControl mb="30px">
          <FormLabel mb="5px">Пароль</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Введите пароль"
              isInvalid={Boolean(errors.password?.message)}
              errorBorderColor="crimson"
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
          <FormHelperText color="crimson">
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
        <Button disabled={!isValid} type="submit">
          Зарегистрироваться
        </Button>
      </form>

      <Heading as="h3" fontWeight="400" fontSize="18px" mt="50px">
        Уже зарегистрированы?{" "}
        <Link to="/login" style={{ color: "#0077ff" }}>
          Войти
        </Link>
      </Heading>
    </Flex>
  );
};
