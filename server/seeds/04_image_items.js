exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("image_items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("image_items").insert([
        {
          item_id: "dcaf01fc-716e-4e67-808c-d1e74b450fda",
          image_id: "fffac60e-e765-4ec7-b344-785e0c5d8840",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [
            243, 533, 223, 534, 211, 529, 209, 521, 209, 514, 219, 505, 238,
            498, 251, 493, 273, 494, 281, 501, 281, 510, 272, 521,
          ],
          item_name: "Wireless Charger",
          item_url: "http://www.amazon.com",
          number_of_clicks: 0,
        },

        {
          item_id: "2dd36871-ce10-4a6d-92f6-c75943ab4b7d",
          image_id: "fffac60e-e765-4ec7-b344-785e0c5d8840",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [1, 399, 134, 390, 119, 36, 1, 4],
          item_name: "Movie Poster",
          item_url: "http://www.amazon.com",
          number_of_clicks: 0,
        },

        {
          item_id: "3583a8e9-fe32-449b-9453-a9c6041e55fe",
          image_id: "fffac60e-e765-4ec7-b344-785e0c5d8840",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [
            175, 51, 182, 388, 417, 367, 422, 255, 446, 255, 443, 112,
          ],
          item_name: "Zelda Poster",
          item_url: "http://www.amazon.com",
          number_of_clicks: 0,
        },

        {
          item_id: "b645d161-8444-4f86-8d00-3feb34c2935d",
          image_id: "3b2c4950-222b-4007-9a7c-cc9e925b9cf0",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [172, 372, 904, 600, 899, 567, 177, 363],
          item_name: "Desk",
          item_url: "http://www.amazon.com",
          number_of_clicks: 0,
        },

        {
          item_id: "b9f28f46-4bb9-44dd-a9ae-efda68e5aeb8",
          image_id: "3b2c4950-222b-4007-9a7c-cc9e925b9cf0",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [489, 395, 421, 425, 570, 470, 613, 424],
          item_name: "Corsair Mousepad",
          item_url: "http://www.amazon.com",
          number_of_clicks: 0,
        },

        {
          item_id: "cc1874ff-b2f2-4c13-9e00-cc46f1f29fbe",
          image_id: "3b2c4950-222b-4007-9a7c-cc9e925b9cf0",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [695, 263, 681, 495, 917, 559, 953, 265],
          item_name: "Custom Pc",
          item_url: "http://www.amazon.com",
          number_of_clicks: 0,
        },

        {
          item_id: "73286acb-5b84-4e3c-acce-f650f5a1589f",
          image_id: "79e564cc-6362-4f0d-8c1f-4d00f3c5897d",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [
            671, 490, 664, 491, 678, 504, 697, 510, 716, 511, 705, 486, 691,
            477, 673, 477,
          ],
          item_name: "Corsair Mouse",
          item_url: "http://www.amazon.com",
          number_of_clicks: 321,
        },

        {
          item_id: "d8a25a22-5285-4bcf-97bb-a447a25a158f",
          image_id: "79e564cc-6362-4f0d-8c1f-4d00f3c5897d",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [295, 482, 257, 533, 518, 517, 506, 472],
          item_name: "Corsair Keyboard",
          item_url: "http://www.amazon.com",
          number_of_clicks: 401,
        },

        {
          item_id: "dfd3e9bb-dcb7-49ca-a10a-88b8d7f27309",
          image_id: "79e564cc-6362-4f0d-8c1f-4d00f3c5897d",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [499, 319, 497, 411, 726, 427, 732, 321],
          item_name: "Samsung Monitor",
          item_url: "http://www.amazon.com",
          number_of_clicks: 291,
        },

        {
          item_id: "1195cac4-a92b-41c1-86a9-3af3a84f69c3",
          image_id: "79e564cc-6362-4f0d-8c1f-4d00f3c5897d",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          coords_list: [262, 318, 258, 427, 495, 412, 497, 319],
          item_name: "Lg Monitor",
          item_url: "http://www.amazon.com",
          number_of_clicks: 179,
        },
      ]);
    });
};
