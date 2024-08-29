import { DiscountApplicationStrategy } from "../generated/api";

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

// Updated Discount thresholds and percentages
const DISCOUNT_TIERS = [
  { threshold: 450, percentage: 100 },  // 40% for subtotals equal to or above 4000
  { threshold: 350, percentage: 70 },  // 30% for subtotals from 3000 to 3999
  { threshold: 250, percentage: 50 },  // 20% for subtotals from 2000 to 2999
  { threshold: 100, percentage: 10 },  // 10% for subtotals from 1000 to 1999
];

export function run(input) {
  // Get the subtotal amount directly from the input
  const subtotalAmount = parseFloat(input.cart.cost.subtotalAmount.amount);

  // Determine the discount percentage based on the subtotal amount
  let discountPercentage = 0;
  for (const tier of DISCOUNT_TIERS) {
    if (subtotalAmount >= tier.threshold) {
      discountPercentage = tier.percentage;
      break; // Exit loop once the correct tier is found
    }
  }

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
