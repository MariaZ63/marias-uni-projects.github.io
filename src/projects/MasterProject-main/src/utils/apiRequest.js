import { filter } from "./filter"; 
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

/**
 * Transforms an array of book data objects into a formatted text summary.
 *
 * @param {Array<Object>} data - Array of book objects, each containing book properties like Title, Authors, ISBN, and others.
 * @returns {string} A formatted string with detailed information for each book in the input array.
 */
const transformToText = (data) => {
    return data
      .map((row) => {
        return `Title: ${row.Title}
                Authors: ${row.Authors}
                Contributors: ${row.Contributors}
                ISBN: ${row.ISBN}
                Format: ${row.Format}
                Read Status: ${row["Read Status"]}
                Date Read: ${row["Date Read"]}
                Star Rating: ${row["Star Rating"]}
                Review: ${row.Review}
                Owned: ${row.Owned}
                Number of Pages: ${row["Number of Pages"]}
                Year Published: ${row["Year Published"]}
                Original Publication Year: ${row["Original Publication Year"]}
                Average Rating: ${row["Average Rating"]}
                Country: ${row.Country}
                Gender: ${row.Gender}
                Language: ${row.Language}\n`;
      })
      .join("\n");
  };

  /**
 * Sends a formatted reading list summary and a message to the OpenAI API for processing.
 *
 * @async
 * @param {string} message - The main prompt or question to send to the API.
 * @param {Array<Object>} data - Array of book data objects to filter and transform into text.
 * @returns {Promise<string>} The response from the OpenAI API.
 */
export const apiRequest = async (message, data) => {
  try {

    const readBooks = filter(data, "Read Status", "read");
    const textData = transformToText(readBooks);

    const result = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are part of a personalized interactive data story that treats the reader's reading data. You are the voice of the main character, which is a bookworm with a cat named Archie. Talk in a friendly, informal, personal tone as if you were talking to a friend. Relate to the reader by mentioning your own experiences (e.g., having read a book before).",
          },
          {
            role: "user",
            content: `${message}
                      Here is a detailed summary of the user's reading list that serves as a basis for your reasoning:\n\n
                      ${textData}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    //console.log(result.data.choices[0].message.content);
    const res = result.data.choices[0].message.content;
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};
