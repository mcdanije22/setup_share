exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("images")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("images").insert([
        {
          image_id: "fffac60e-e765-4ec7-b344-785e0c5d8840",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          image_url:
            "https://share-set-up-uploads.s3.us-east-2.amazonaws.com/cd2f799f5a9213849bd69cf43d7e1ae4",
          image_position: "Left",
          image_position_number: 0,
          aws_key: "cd2f799f5a9213849bd69cf43d7e1ae4",
        },
        {
          image_id: "3b2c4950-222b-4007-9a7c-cc9e925b9cf0",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          image_url:
            "https://share-set-up-uploads.s3.us-east-2.amazonaws.com/f33557e6f5d06ebbac86a01b92f6f56d",
          image_position: "Right",
          image_position_number: 2,
          aws_key: "f33557e6f5d06ebbac86a01b92f6f56d",
        },
        {
          image_id: "79e564cc-6362-4f0d-8c1f-4d00f3c5897d",
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          image_url:
            "https://share-set-up-uploads.s3.us-east-2.amazonaws.com/a27e20b75aa55dafa7860112486b947a",
          image_position: "Main",
          image_position_number: 1,
          aws_key: "a27e20b75aa55dafa7860112486b947a",
        },
      ]);
    });
};
