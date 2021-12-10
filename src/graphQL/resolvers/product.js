import fetch from "node-fetch";

export default  {
    Query: {
        productDetails: async (root, args, { req }, info) => {
            try {
                const response = await fetch(`https://rh.com/rh/api/product/availableOptions/v1/prod6371043?selectedOptions=${args.id.join()}`);
                const data = await response.json();
                return data;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
};