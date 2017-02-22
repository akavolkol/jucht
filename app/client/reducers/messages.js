const defaultState = {
    loading: true,
    errors: null,
    products: []
}

export default function messages(state = defaultState, action) {
  let products = state.products;

    switch (action.type) {

        case 'GET_PRODUCTS_REQUEST':
        case 'CREATE_PRODUCT_REQUEST':
          return {
            ...state,
            loading: true,
            errors: null,
            created: false
             };

        case 'DELETE_PRODUCT_REQUEST':
          return {
            ...state,
            loading: true,
            deleted: false
          };

        case 'DELETE_PRODUCT_OK':
        let key;
        state.products.forEach((category, arrayKey) => {

              if (category.id === action.id) {
                key = arrayKey;
              }

            });

          products.splice(key, 1);

          return {
            ...state,
            loading:false,
            products: productsMod
          }

        case 'GET_PRODUCTS_OK':
          return {
            ...state,
            loading: false,
            errors: null,
            products:  action.data
          };

        case 'CREATE_PRODUCT_OK':
        //let products = state.products;
        products.push(action.category);
          return  {
            ...state,
            products: products,
            errors: null,
            created: true
          }

        case 'DELETE_PRODUCT_FAIL':
          return {
            ...state,
            loading: false,
            errors: null,
            deleted: false,
            created: false
          }
        case 'GET_PRODUCTS_FAIL':
        case 'DELETE_PRODUCT_FAIL':
        case 'CREATE_PRODUCT_FAIL':
          return {...state,
            loading: false,
            errors: action.message,
            created: false
          };

        default:
            return state;
    }
}
