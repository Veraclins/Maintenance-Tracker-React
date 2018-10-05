export const formatSingle = (request) => {
  const {
    id,
    user_id: userId,
    title,
    device,
    status,
    description,
    created_at: createdAt,
    updated_at: updatedAt,
  } = request;
  return {
    id,
    userId,
    title,
    device,
    status,
    description,
    createdAt,
    updatedAt,
  };
};

export const formatMultiple = requests => requests.map(request => formatSingle(request));
