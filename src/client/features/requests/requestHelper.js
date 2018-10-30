
const handleChange = (input, event, field) => {
  const {
    type,
    required,
    options,
    placeholder,
  } = input[event.target.name];
  return {
    [field]: {
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

export const changeInput = (event, state) => {
  const { input } = state;
  return handleChange(input, event, 'input');
};

export const changeSelect = (event, state) => {
  const { select } = state;
  return handleChange(select, event, 'select');
};

export const changeTextArea = (event, state) => {
  const { textArea } = state;
  return handleChange(textArea, event, 'textArea');
};

export const handleRequestSubmit = (event, props, data) => {
  event.preventDefault();
  const {
    create,
    update,
    user,
    request,
  } = props;
  const {
    title,
    device,
    description,
  } = data;
  const id = update ? request.id : undefined;
  const callBack = create || update;
  return callBack({
    id,
    title,
    device,
    description,
  }, user);
};

export const fetchRequest = ({ getRequests, user }) => getRequests(user);
