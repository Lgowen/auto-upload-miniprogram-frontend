import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface PolicyRecord {
  id: string;
  number: number;
  name: string;
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
  filterType: 'artificial' | 'rules';
  count: number;
  status: 'online' | 'offline';
  createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}

export async function getBranchInfo(params: any) {
  return axios.get('/api/branchInfo', {
    params,
  });
}

export async function getQrcode(params: any) {
  return axios.post('/api/preview', params);
}

export async function getBranch(params: any) {
  return axios.post('/api/repository/branch', params);
}

export async function uploadBundle(params: any) {
  return axios.get('/api/upload', {
    params,
  });
}

export async function getPages() {
  return axios.get(`/api/pagesList`);
}

export async function getLocalPage(url: string) {
  return axios.get(`${url}/api/pagesList`);
}

export async function getFormList(url: string, params: any) {
  return axios.get(`${url}/api/formList`, {
    params,
  });
}

export async function getConfigList(url: string, params: any) {
  return axios.get(`${url}/api/configList`, {
    params,
  });
}

export async function previewAlipay(url: string, params: any) {
  return axios.post(`${url}/api/previewAlipay`, params);
}
