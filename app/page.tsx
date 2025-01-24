import React from "react";
import allBirthdays from "../lib/all-birthdays.json";

type Options = {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day: "numeric" | "2-digit";
};

const options: Options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface Background {
  type: "linear_gradient" | "solid_color" | "radial_gradient";
  colors?: string[];
  stops?: number[];
  position?: string;
  color?: string;
}

interface Birthday {
  name: string;
  age: number;
  birthday: string;
  greeting_message: string;
  background: Background;
  text_color: string;
}

// Function to generate Tailwind classes and custom styles
function generateTailwindClasses(birthday: Birthday) {
  const { background, text_color } = birthday;
  let bgClass = "";
  let customStyles: React.CSSProperties = {};

  if (background.type === "linear_gradient") {
    customStyles.background = `linear-gradient(to ${background.position?.replace(
      "_",
      " "
    )}, 
      ${background.colors
        ?.map((color, index) => `${color} ${background.stops![index]}%`)
        .join(", ")})`;
  } else if (background.type === "solid_color") {
    customStyles.backgroundColor = background.color || "";
  } else if (background.type === "radial_gradient") {
    customStyles.background = `radial-gradient(circle, 
      ${background.colors
        ?.map((color, index) => `${color} ${background.stops![index]}%`)
        .join(", ")})`;
  }

  if (isValidTailwindColor(text_color)) {
    bgClass = `text-${text_color}`;
  } else {
    customStyles.color = text_color;
  }

  return {
    tailwindClasses: `${bgClass}`,
    customStyles,
  };
}

// Helper functions
function getGradientDirection(position: string): string {
  switch (position) {
    case "top_right":
      return "bg-gradient-to-tr";
    case "top_left":
      return "bg-gradient-to-tl";
    case "bottom_right":
      return "bg-gradient-to-br";
    case "bottom_left":
      return "bg-gradient-to-bl";
    case "top":
      return "bg-gradient-to-t";
    case "bottom":
      return "bg-gradient-to-b";
    case "left":
      return "bg-gradient-to-l";
    case "right":
      return "bg-gradient-to-r";
    default:
      return "";
  }
}

function isValidTailwindColor(color: string): boolean {
  const tailwindColors = [
    "blue",
    "red",
    "green",
    "yellow",
    "gray",
    "black",
    "white",
    "purple",
    "pink",
    "indigo",
    "teal",
    "orange",
  ];
  return tailwindColors.includes(color);
}

const BirthdaysList: React.FC = () => {
  const birthdayCategories = Object.values(allBirthdays).flat() as Birthday[];

  return (
    <main className="container min-h-screen mx-auto p-5 flex flex-col gap-5">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
        Birthday Wishes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {birthdayCategories.map((birthday, index) => {
          const { tailwindClasses, customStyles } =
            generateTailwindClasses(birthday);

          return (
            <div
              className={`flex-1 flex flex-col gap-4 p-5 rounded-xl border border-green-200 transform transition-transform hover:scale-105 hover:shadow-xl ${tailwindClasses}`}
              style={customStyles}
              key={`${birthday?.name}_${index}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">{birthday?.name}</h2>
                  <h3 className="text-lg">
                    {new Date(birthday?.birthday).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </h3>
                </div>
                <div className="bg-green-200 text-green-900 font-semibold text-lg px-3 py-1 rounded-full shadow-sm">
                  {birthday?.age} years
                </div>
              </div>
              <div className="flex items-center justify-center min-h-28 bg-gradient-to-tl from-green-200 to-green-100 rounded-lg p-4">
                <p className="text-md font-medium text-center">
                  {birthday?.greeting_message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 text-neutral-600">
        &copy;
        <span>
          {new Date().getFullYear()}
          <span className="font-bold ml-2">
            birthdays.maheshmuttintidev.in
          </span>
        </span>
      </div>
    </main>
  );
};

export default BirthdaysList;
