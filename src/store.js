
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartStore'
import orderReducer from "./features/order/order"
import navigationReducer from "./features/nav/currentNav"
import redeemReducer from "./features/redeemPoint/redeem"
import inboxMessageReducer from "./features/inbox/inbox"
import itemTypeReducer from "./features/itemsType/items"

export default configureStore({
  reducer: {
    cart:cartReducer,
    order:orderReducer,
    navigation:navigationReducer,
    redeem:redeemReducer,
    inboxMessage:inboxMessageReducer,
    itemType:itemTypeReducer,
  }
})