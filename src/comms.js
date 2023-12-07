import { showToast } from "./toast";

export async function getBoard() {
  return {
    width: 9,
    height: 9,
    board:
      "53xx7xxxx6xx195xxxx98xxxx6x8xxx6xxx34xx8x3xx17xxx2xxx6x6xxxx28xxxx419xx5xxxx8xx79",
    id: "1",
  };

  const url =
    "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuBoard/1";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    showToast(error);
  }
}

export async function getSolution() {
  return {
    solution:
      "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
    id: "1",
  };
  try {
    const url =
      "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuSolutions/1";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    showToast(error);
  }
}
