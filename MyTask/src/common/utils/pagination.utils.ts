import ApiError from "../response/error";

export interface IPagination {
  limit: number;
  offset: number;
}

const defaultList = 1;
const defaultSize = 10;

export const getPagination = (
  list: string | undefined,
  size: string | undefined
): IPagination => {
  const myList = list ? +list : defaultList;
  const mySize = size ? +size : defaultSize;
  if (isNaN(myList) || isNaN(mySize)) {
    throw ApiError.badRequest("Wrong pagination");
  } else {
    return { limit: mySize, offset: (myList - 1) * mySize };
  }
};
