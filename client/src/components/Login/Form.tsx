import React, {
  FormEvent,
  useContext,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import Context from '../../context/context';
import LabeledInput from '../LabeledInput';
import Button from '../Button';
import {
  CART_ROUTE,
  CHECKOUT_ROUTE,
  FRONT_PAGE_ROUTE, GUEST, longNotification, red,
} from '../../utils/consts';
import { login, registration, registrationGuest } from '../../http/userAPI';
import { validateEmail, validatePassword } from '../../utils/functions';
import { QueryReqLogin, QueryReqRegistration } from '../../types/types';

interface FormProps {
  isLogin: boolean;
}

function Form({ isLogin }: FormProps) {
  const {
    notifications,
    user,
    cart,
  } = useContext(Context);
  const navigate = useNavigate();
  const [pressedSubmit, setPressedSubmit] = useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navOnSuccess = () => {
    if (user.loginToCheckout) {
      navigate(`/${CART_ROUTE}/${CHECKOUT_ROUTE}`);
    } else {
      navigate(FRONT_PAGE_ROUTE);
    }
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setPressedSubmit(true);
    try {
      if (isLogin) {
        if (!email || !password) {
          notifications.error(
            'Please complete required fields',
          );
          return;
        }
        const body: QueryReqLogin = {
          emailOrUsername: email,
          password,
        };
        if (user.isGuest && cart.items.length > 0) {
          body.guestItems = cart.items;
        }
        const { user: fetchedUser, cart: fetchedCart } = await login(body);
        user.set(fetchedUser);
        cart.set(fetchedCart);
        notifications.neutral(
          'You logged in successfully',
        );
        navOnSuccess();
        return;
      }
      const validEmail = validateEmail(email);
      if (!validEmail) {
        notifications.message(
          'Invalid email format',
          red,
          longNotification,
        );
        return;
      }
      const validPassword = validatePassword(password);
      if (!validPassword) {
        notifications.message(
          'Please choose a password between 6 and 256 characters',
          red,
          longNotification,
        );
        return;
      }
      if (!email || !username || !password || !confirmPassword) {
        notifications.error(
          'Please complete required fields',
        );
        return;
      }
      const body: QueryReqRegistration = {
        email,
        password,
        username,
      };
      const mustFullyRegisterGuest = user.roles.indexOf(GUEST) >= 0 && cart.userId !== '-1';
      if (mustFullyRegisterGuest) {
        const newUser = await registrationGuest(body);
        user.set(newUser);
      } else {
        const { user: newUser, cart: newCart } = await registration(body);
        cart.set(newCart);
        user.set(newUser);
      }
      notifications.neutral(
        'You registered successfully',
      );
      navOnSuccess();
      return;
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    }
  };
  if (isLogin) {
    return (
      <form onSubmit={submit}>
        <button type="button" onClick={() => notifications.message('You logged in successfully', '', 2200)}>
          NOTIFICATION
        </button>
        <LabeledInput
          label="Username or Email"
          input={email}
          setInput={setEmail}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          id="email-field"
          type="input"
          placeholder="Your username or email"
        />
        <LabeledInput
          label="Password"
          input={password}
          setInput={setPassword}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Your password"
          type="password"
          id="password-field"
        />
        <Button
          id="submit-button"
          type="submit"
        >
          Login
        </Button>
      </form>
    );
  }
  return (
    <form onSubmit={submit}>
      <LabeledInput
        label="Username"
        input={username}
        setInput={setUsername}
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
        placeholder="Your username"
        type="input"
        id="username-field"
      />
      <LabeledInput
        label="Email"
        input={email}
        setInput={setEmail}
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
        placeholder="Your email"
        type="input"
        id="email-field"
      />
      <LabeledInput
        label="Password"
        input={password}
        setInput={setPassword}
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
        placeholder="Password"
        subscript="Minimum of 6 characters"
        type="password"
        id="password-field"
      />
      <LabeledInput
        label="Confirm password"
        input={confirmPassword}
        setInput={setConfirmPassword}
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
        placeholder="Confirm password"
        type="password"
        id="confirm-password-field"
      />
      <Button
        id="submit-button"
        type="submit"
      >
        Register
      </Button>
    </form>
  );
}

export default observer(Form);
