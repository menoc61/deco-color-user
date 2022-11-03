import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketService } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [company, setCompany] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketServices, setBasketServices] = useState([]);

  const totalPrice = basketServices.reduce(
    (sum, basketService) => sum + basketService.quantity * basketService.Service.price,
    company?.deliveryFee
  );

  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.companyID("eq", company.id).userID("eq", dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, company]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketService, (bd) => bd.basketID("eq", basket.id)).then(
        setBasketServices
      );
    }
  }, [basket]);

  const addServiceToBasket = async (service, quantity) => {
    // get the existing basket or create a new one
    let theBasket = basket || (await createNewBasket());

    // create a BasketService item and save to Datastore
    const newService = await DataStore.save(
      new BasketService({ quantity, Service: service, basketID: theBasket.id })
    );

    setBasketServices([...basketServices, newService]);
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, companyID: company.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addServiceToBasket,
        setCompany,
        company,
        basket,
        basketServices,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
