export const useGetData = createUseFetch((other_options) => {
  
  const config = useRuntimeConfig()

  return {
    ...other_options,
    baseURL: config.public.apiBase,
    onRequest({ options }) {
        
        options.headers = new Headers(options.headers)

        options.headers.set('Accept', 'application/json')
    }
  }
  
})