export enum LoadingState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const LoadingStates: LoadingState[] = Object.values(LoadingState);
