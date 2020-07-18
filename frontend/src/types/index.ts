import React from 'react';
import { RouteComponentProps } from "react-router-dom";

// 렌더링할 component type
export type RoutePageType =
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;

export type AuthenticatedType = {
  authenticated: string | null;
}

export type User = {
  userType: UserType;
  userId: string;
  profileImage: string; 
  userName: string;
  phoneNum: string;
  storeName: string;
  address: string;
  orderIdList: string[];
  cartIdList: string[];
  reviewIdList: string[];
}

export type SidebarItemType = {
  value: string;
  path: string;
}

export type TopNavItemType = {
  value: string;
  path: string;
}

export type SellerInfoType = {
  sellerProfileImage: string;
  location: string;
  sellerName: string;
}

export type ProductItemType = {
  prouductId: number; 
  productImage: string;
  price: number;
  productTitle: string;
} & SellerInfoType;

export type categoryItem = {
  categoryId: number;
  value: string;
}

export type CategoryType = {
  title: string;
  items: categoryItem[];
}

export enum UserType {
  USER,
  SELLER,
}

export enum SortType {
  RECENT = 0,
  LOW_PRICE = 1,
  UPPER_PRICE = 2,
  SHORT_DISTANCE = 3,
}

