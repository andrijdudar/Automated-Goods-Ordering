export const filteredItems = (items, options) => {
  return items.filter((item) =>
    options.some((option) => option.id === item.id)
  );
};

export const convertToOptionsSelect = (obg) => {
  return obg.map((value) => ({
    id: value.id,
    value: value.name || value.dish_name,
  }));
};
