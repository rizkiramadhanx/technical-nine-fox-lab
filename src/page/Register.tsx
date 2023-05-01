import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link as NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { TRegisterForm } from '@/types/form';
import * as yup from 'yup';

const schema: yup.ObjectSchema<TRegisterForm> = yup.object().shape({
  name: yup.string().required('nama harus diisi').min(5, 'minimal 5 karakter'),
  email: yup.string().email('harus berupa email').required('email harus diisi'),
  password: yup
    .string()
    .required('password harus diisi')
    .min(8, 'minimal 8 karakter')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'Harus berupa kombinasi alfabet dan angka'
    ),
});

export default function Register() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<TRegisterForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TRegisterForm) => console.log(data);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Register</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          minW={{
            md: '400px',
          }}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="username"
                isInvalid={errors.name?.message ? true : false}
              >
                <FormLabel>Name</FormLabel>
                <Input type="name" {...register('name')} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="email"
                isInvalid={errors.email?.message ? true : false}
              >
                <FormLabel>Email</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password?.message ? true : false}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Link color={'blue.400'} as={NavLink} to="/login">
                    Login?
                  </Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  disabled={!isValid}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
