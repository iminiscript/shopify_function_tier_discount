import { DiscountApplicationStrategy } from "../generated/api";

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

// Updated Discount thresholds and percentages
const DISCOUNT_TIERS = [
  { threshold: 400, percentage: 100 },  // 100% for subtotals equal to or above 400
  { threshold: 250, percentage: 50 },   // 50% for subtotals from 250 to 399
  { threshold: 150, percentage: 15 },   // 15% for subtotals from 150 to 249
  { threshold: 0, percentage: 0 },      // 0% for subtotals below 150
];

export function run(input) {
  const { cart } = input;

  // Check if all cart lines have the GWP product
  const allItemsHaveGWP = cart.lines.every(line => 
    line.tier_discount && line.tier_discount.value === "true"
  );

  // If not all items have GWP, return empty discount
  if (!allItemsHaveGWP) {
    return EMPTY_DISCOUNT;
  }

  // Get the subtotal amount directly from the input
  const subtotalAmount = parseFloat(cart.cost.subtotalAmount.amount);

  // Determine the discount percentage based on the subtotal amount
  let discountPercentage = 0;
  for (const tier of DISCOUNT_TIERS) {
    if (subtotalAmount >= tier.threshold) {
      discountPercentage = tier.percentage;
      break; // Exit loop once the correct tier is found
    }
  }

  // If the discount is 0, return the empty discount
  if (discountPercentage === 0) {
    return EMPTY_DISCOUNT;
  } else {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          message: `${discountPercentage}USD OFF for spending over $${DISCOUNT_TIERS.find(tier => tier.percentage === discountPercentage).threshold}`,
          value: {
            fixedAmount: {
              amount: discountPercentage.toFixed(2), // Convert to string with two decimal places
            },
          },
          targets: [
            {
              orderSubtotal: {
                excludedVariantIds: []
              }
            }
          ],
        },
      ],
    };
  }
}






// import { DiscountApplicationStrategy } from "../generated/api";

// const EMPTY_DISCOUNT = {
//   discountApplicationStrategy: DiscountApplicationStrategy.First,
//   discounts: [],
// };

// // Updated Discount thresholds and percentages
// const DISCOUNT_TIERS = [
//   //{ threshold: 450, percentage: 100 },  // 40% for subtotals equal to or above 4000
//   { threshold: 400, percentage: 100 },  // 30% for subtotals from 3000 to 3999
//   { threshold: 250, percentage: 50 },  // 20% for subtotals from 2000 to 2999
//   { threshold: 150, percentage: 15 },
//   { threshold:   0, percentage:  0 },  // 10% for subtotals from 1000 to 1999
// ];

// export function run(input) {
//   // Get the subtotal amount directly from the input
//   const subtotalAmount = parseFloat(input.cart.cost.subtotalAmount.amount);

//   // Determine the discount percentage based on the subtotal amount
//   let discountPercentage = 0;
//   for (const tier of DISCOUNT_TIERS) {
//     if (subtotalAmount >= tier.threshold) {
//       discountPercentage = tier.percentage;
//       break; // Exit loop once the correct tier is found
//     }
//   }

//   if (discountPercentage === 0) {
//     return EMPTY_DISCOUNT;
//   } else {
//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.First,
//       discounts: [
//         {
//           message: `${discountPercentage}USD OFF for spending over $${DISCOUNT_TIERS.find(tier => tier.percentage === discountPercentage).threshold}`,
//           value: {
//             fixedAmount: {
//               amount: discountPercentage, // Convert to string with two decimal places
//             },
//           },
//           targets: [
//             {
//               orderSubtotal: {
//                 excludedVariantIds: []
//               }
//             }
//           ],
//         },
//       ],
//     };
//   }
// }



// const EMPTY_DISCOUNT = {
//   discountApplicationStrategy: DiscountApplicationStrategy.First,
//   discounts: [],
// };

// const MIN_UNIQUE_PRODUCT = 2;
// const DISCOUNT_PER_PRODUCT = 5;
// const MAX_DISCOUNT = 20;

// export function run(input) {
//   let uniqueProducts = new Set();

//   input.cart.lines.forEach(line => {
//     uniqueProducts.add(line.merchandise.product.id);
//   });
//   console.log(`🚀 ~ file: run.js:18 ~ run ~ uniqueProducts:`, uniqueProducts)
 

//   if (uniqueProducts.size < MIN_UNIQUE_PRODUCT) {
//     return EMPTY_DISCOUNT;
//   } else {
//     const discount = Math.min(uniqueProducts.size * DISCOUNT_PER_PRODUCT, MAX_DISCOUNT);
//     const uniqueDiscountProducts = discount / DISCOUNT_PER_PRODUCT;

//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.First,
//       discounts: [
//         {
//           message: `${discount}% OFF for ${uniqueDiscountProducts} unique products`,
//           value: {
//             percentage: {
//               value: discount, // Convert to string with two decimal places
//             },
//           },
//           targets: [
//         {
//           orderSubtotal: {
//             excludedVariantIds: []
//           }
//         }
//       ],
//         },
//       ],
//     };
//   }
// }


// export function run(input) {
//   const targets = input.cart.lines
//     // Only include cart lines with a quantity of two or more
//     .filter((line) => line.quantity >= 1)
//     .map((line) => {
//       return {
//         cartLine: {
//           id: line.id,
//         },
//       };
//     });

//   if (!targets.length) {
//     console.error("No cart lines qualify for volume discount.");
//     return EMPTY_DISCOUNT;
//   }

//   return {
//     discounts: [
//       {
//         targets,
//         value: {
//           percentage: {
//             value: "10.0",
//           },
//         },
//       },
//     ],
//     discountApplicationStrategy: DiscountApplicationStrategy.First,
//   };
// }


//import { DiscountApplicationStrategy } from "../generated/api";

// const EMPTY_DISCOUNT = {
//   discountApplicationStrategy: DiscountApplicationStrategy.First,
//   discounts: [],
// };

// // Updated Discount thresholds and percentages
// const DISCOUNT_TIERS = [
//   { threshold: 450, percentage: 100 },  // 100% for subtotals equal to or above 450
//   { threshold: 350, percentage: 70 },   // 70% for subtotals from 350 to 449
//   { threshold: 250, percentage: 50 },   // 50% for subtotals from 250 to 349
//   { threshold: 100, percentage: 10 },   // 10% for subtotals from 100 to 249
//   { threshold: 0, percentage: 0 },      // 0% for subtotals below 100
// ];

// export function run(input) {
//   // Get the subtotal amount directly from the input
//   const subtotalAmount = parseFloat(input.cart.cost.subtotalAmount.amount);
//   const uniqueProducts = [];

//   input.cart.lines.forEach(line => {
//     if (line.merchandise.product.productType === "GWP") {
//       // Your logic here for handling "GWP" products
//     }
//   });

//   // Determine the discount percentage based on the subtotal amount
//   let discountPercentage = 0;
//   for (const tier of DISCOUNT_TIERS) {
//     if (subtotalAmount >= tier.threshold) {
//       discountPercentage = tier.percentage;
//       break; // Exit loop once the correct tier is found
//     }
//   }

//   if (discountPercentage === 0) {
//     return EMPTY_DISCOUNT;
//   } else {
//     const discounts = [
//       {
//         message: `${discountPercentage} USD OFF for spending over $${DISCOUNT_TIERS.find(tier => tier.percentage === discountPercentage).threshold}`,
//         value: {
//           fixedAmount: {
//             amount: discountPercentage.toFixed(2), // Convert to string with two decimal places
//           },
//         },
//         targets: [
//           {
//             orderSubtotal: {
//               excludedVariantIds: []
//             }
//           }
//         ],
//       },
//     ];

//     // Log discountApplicationStrategy and discounts
//     console.log("Discount Application Strategy:", DiscountApplicationStrategy);
//     console.log("Discounts:", JSON.stringify(discounts, null, 2));

//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.First,
//       discounts: discounts,
//     };
//   }
// }



// import { DiscountApplicationStrategy } from "../generated/api";

// const EMPTY_DISCOUNT = {
//   discountApplicationStrategy: DiscountApplicationStrategy.All,
//   discounts: [],
// };

// // Updated Discount thresholds and percentages
// const DISCOUNT_TIERS = [
//   { threshold: 2700, percentage: 100 },
//   { threshold: 350, percentage: 70 },
//   { threshold: 250, percentage: 50 },
//   { threshold: 100, percentage: 10 },
//   { threshold: 0, percentage: 0 },
// ];

// export function run(input) {
//   // Get the subtotal amount directly from the input
//   let subtotalAmount = parseFloat(input.cart.cost.subtotalAmount.amount);
//   let gwpAmount = 0; // Variable to hold the total cost of GWP products
//   const gwpDiscounts = []; // Array to hold discounts for GWP products

//   // Loop through the cart lines to find GWP products
//   input.cart.lines.forEach((line) => {
//     if (line.merchandise.product.productType === "GWP") {
//       // Add the cost of the GWP product to gwpAmount
//       gwpAmount += parseFloat(line.cost.amountPerQuantity.amount) * line.quantity;

//       // Add 100% discount for each GWP product
//       gwpDiscounts.push({
//         targets: [
//           {
//             productVariant: {
//               id: line.merchandise.id,
//             },
//           },
//         ],
//         value: {
//           percentage: {
//             value: 100, // 100% discount on GWP product
//           },
//         },
//       });
//     }
//     console.log("gwpDiscounts:", JSON.stringify(gwpDiscounts, null, 2));
//   });

//   // Subtract GWP total cost from the subtotal
//   subtotalAmount -= gwpAmount;
//   console.log(`🚀 ~ file: run.js:50 ~ run ~ gwpAmount:`, gwpAmount)
//   console.log(`🚀 ~ file: run.js:50 ~ run ~ subtotalAmount:`, subtotalAmount)

//   // Determine the discount percentage based on the adjusted subtotal amount
//   let discountPercentage = 0;
//   for (const tier of DISCOUNT_TIERS) {
//     if (subtotalAmount >= tier.threshold) {
//       discountPercentage = tier.percentage;
//       break; // Exit loop once the correct tier is found
//     }
//   }

//   // If no discount should be applied, return the empty discount
//   if (discountPercentage === 0 && gwpDiscounts.length === 0) {
//     return EMPTY_DISCOUNT;
//   } else {
//     // Create the discounts array combining both order subtotal discount and individual product discounts
//     const discounts = [];

//     // Add order subtotal discount if applicable
//     if (discountPercentage > 0) {
//       discounts.push({
//         message: `${discountPercentage}USD OFF for spending over $${DISCOUNT_TIERS.find((tier) => tier.percentage === discountPercentage).threshold}`,
//         value: {
//           fixedAmount: {
//             amount: discountPercentage,
//           },
//         },
//         targets: [
//           {
//             orderSubtotal: {
//               excludedVariantIds: [],
//             },
//           },
//         ],
//       });
//     }

//     // Combine GWP product discounts
//     discounts.unshift(...gwpDiscounts);

//     console.log("discounts-91:", JSON.stringify(discounts, null, 2));

//     // Return the combined discount object
//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.All,
//       discounts,
//     };
//   }
// }




// const EMPTY_DISCOUNT = {
//   discountApplicationStrategy: DiscountApplicationStrategy.First,
//   discounts: [],
// };

// const MIN_UNIQUE_PRODUCT = 2;
// const DISCOUNT_PER_PRODUCT = 5;
// const MAX_DISCOUNT = 20;

// export function run(input) {
//   let uniqueProducts = new Set();

//   input.cart.lines.forEach(line => {
//     uniqueProducts.add(line.merchandise.product.id);
//   });
//   console.log(`🚀 ~ file: run.js:18 ~ run ~ uniqueProducts:`, uniqueProducts)
 

//   if (uniqueProducts.size < MIN_UNIQUE_PRODUCT) {
//     return EMPTY_DISCOUNT;
//   } else {
//     const discount = Math.min(uniqueProducts.size * DISCOUNT_PER_PRODUCT, MAX_DISCOUNT);
//     const uniqueDiscountProducts = discount / DISCOUNT_PER_PRODUCT;

//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.First,
//       discounts: [
//         {
//           message: `${discount}% OFF for ${uniqueDiscountProducts} unique products`,
//           value: {
//             percentage: {
//               value: discount, // Convert to string with two decimal places
//             },
//           },
//           targets: [
//         {
//           orderSubtotal: {
//             excludedVariantIds: []
//           }
//         }
//       ],
//         },
//       ],
//     };
//   }
// }


// export function run(input) {
//   const targets = input.cart.lines
//     // Only include cart lines with a quantity of one or more
//     .filter((line) => line.quantity = 1)
//     .map((line) => {
//       return {
//         productVariant: {
//           id: line.merchandise.id,
//         },
//       };
//     });
//     console.log("Targets:", JSON.stringify(targets, null, 2));
//   if (!targets.length) {
//     console.error("No cart lines qualify for volume discount.");
//     return EMPTY_DISCOUNT;
//   }

//   const discounts = [
//     {
      
//       value: {
//         percentage: {
//           value: "10.0",
//         },
//       },
//       targets,
//     },
//   ];

//   // Log the discounts object in JSON format
//   console.log("Discounts:", JSON.stringify(discounts, null, 2));

//   return {
//     discountApplicationStrategy: DiscountApplicationStrategy.First,
//     discounts
//   };
// }

