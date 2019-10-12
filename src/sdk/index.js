/*
 * @Author: 三少
 * @Date: 2019-08-12 10:43:34
 * @LastEditors: 三少
 * @LastEditTime: 2019-08-12 20:05:15
 * @Description: description
 */
import getLocation from './getLocation/index'
import chooseLocation from './chooseLocation/index'
import chooseImage from './chooseImage'
import previewImage from './previewImage'
import uploadFile from './uploadFile'
import scanCode from './scanCode/index'
import createMapContext from './createMapContext/index'
import showLoading from './showLoading/index'
import hideLoading from './hideLoading/index'
import showActionSheet from './showActionSheet/index'
import openLocation from './openLocation/index'
import pay from './pay/index'
import showModal from './showModal/index'
import showToast from './showToast/index'
import hideToast from './hideToast/index'
import vibrateLong from './vibrateLong'
import getCurrentPage from './getCurrentPage/index'
import getCurrentPath from './getCurrentPath/index'
import getCurrentParams from './getCurrentParams/index'
import showError from './showError/index'
import creditBorrow from './creditBorrow/index'
import paySign from './paysign/index'
import pageScrollTo from './pageScrollTo/index'
import makePhoneCall from './makePhoneCall/index'
import setStorageSync from './setStorageSync/index'
import getStorageSync from './getStorageSync/index'
import removeStorageSync from './removeStorageSync/index'
import setNavigationBarTitle from './setNavigationBarTitle/index'
import showNavigationBarLoading from './showNavigationBarLoading/index'
import hideNavigationBarLoading from './hideNavigationBarLoading/index'
import redirectTo from './redirectTo/index'
import { reLaunch } from './reLaunch/index'
import { navigateTo, navigateBack } from './navigate/index'
import getCallbackPages from './getCallbackPages/index'
import setNavigationBarColor from './setNavigationBarColor/index'
import stopPullDownRefresh from './stopPullDownRefresh/index'
import getSystemInfoSync from './getSystemInfoSync/index'
import getStorageInfoSync from './getStorageInfoSync/index'
import getImageInfo from './getImageInfo/index'
import canvasToTempFilePath from './canvasToTempFilePath/index'
import canvasGetImageData from './canvasGetImageData/index'
import createCanvasContext from './createCanvasContext/index'

export {
  getLocation,
  chooseLocation,
  scanCode,
  createMapContext,
  showLoading,
  hideLoading,
  showActionSheet,
  openLocation,
  chooseImage,
  previewImage,
  uploadFile,
  pay,
  showModal,
  showToast,
  hideToast,
  getCurrentPage,
  getCurrentPath,
  getCurrentParams,
  vibrateLong,
  showError,
  creditBorrow,
  paySign,
  pageScrollTo,
  setStorageSync,
  getStorageSync,
  setNavigationBarTitle,
  removeStorageSync,
  makePhoneCall,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  redirectTo,
  reLaunch,
  navigateTo,
  navigateBack,
  getCallbackPages,
  setNavigationBarColor,
  stopPullDownRefresh,
  getSystemInfoSync,
  getStorageInfoSync,
  getImageInfo,
  canvasToTempFilePath,
  canvasGetImageData,
  createCanvasContext,
}
