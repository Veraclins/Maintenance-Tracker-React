import toastr from 'toastr';
import history from '../../shared/utilities/history';

export const changeInput = (event, state) => {
  const { input } = state;
  const {
    type,
    required,
    placeholder,
  } = input[event.target.name];
  return {
    input: {
      [event.target.name]: {
        type,
        required,
        placeholder,
        value: event.target.value,
      },
    },
  };
};

export const changeSelect = (event, state) => {
  const { select } = state;
  const {
    type,
    required,
    options,
    placeholder,
  } = select[event.target.name];
  return {
    select: {
      [event.target.name]: {
        type,
        options,
        required,
        placeholder,
        value: event.target.value,
      },
    },
  };
};

export const changeTextArea = (event, state) => {
  const { textArea } = state;
  const {
    type,
    required,
    placeholder,
  } = textArea[event.target.name];
  return {
    textArea: {
      [event.target.name]: {
        type,
        required,
        placeholder,
        value: event.target.value,
      },
    },
  };
};

export const handleRequestSubmit = (event, props, data) => {
  event.preventDefault();
  const {
    create,
    update,
    user,
    isLoggedIn,
    location,
    request,
  } = props;
  const {
    title,
    device,
    description,
  } = data;
  if (!isLoggedIn) {
    toastr.error('You must be logged to make a request');
    return history.push('/login', { from: location.pathname });
  }
  const id = update ? request.id : undefined;
  const callBack = create || update;
  return callBack({
    id,
    title,
    device,
    description,
  }, user);
};
