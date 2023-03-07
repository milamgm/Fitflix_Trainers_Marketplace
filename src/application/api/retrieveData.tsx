import { db } from "../../common/utilities/utils";
import { doc, onSnapshot } from "firebase/firestore";
import { IAdData, IUserData, IMessage } from "../../common/types/types";

type TData = IAdData | IUserData | { messages: IMessage[] } | null;

export const getAd = (id: string): Promise<TData> => {
  return getData("ads_collection", id);
};

export const getUser = (id: string): Promise<TData> => {
  return getData("user_data", id);
};

export const getChat = (id: string): Promise<TData> => {
  return getData("chats", id);
};

const getData = (collection: string, id: string): Promise<TData> =>
  new Promise((resolve, reject) => {
    try {
      onSnapshot(doc(db, collection, id), (doc) =>
        resolve(doc.data() as TData)
      );
    } catch (err) {
      reject(err);
    }
  });
