import allBirthdays from "../lib/all-birthdays.json";

const options: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export default function Home() {
  return (
    <main className="container bg-gradient-to-t from-lime-100 to-lime-300 min-h-screen mx-auto items-center p-5 flex flex-col gap-3">
      <div className="flex flex-row gap-2 flex-wrap">
        {Object.values(allBirthdays)
          ?.flat()
          ?.map((birthday, index) => {
            return (
              <div
                className="flex-1 flex flex-col gap-4 bg-[#f9f9f94d] backdrop-blur-md p-3 rounded-md shadow-lg border-2 border-lime-400"
                key={`${birthday?.name}_${index}`}
              >
                <div className="flex items-center gap-3 flex-grow justify-between">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-3xl text-green-700 font-bold">
                      {birthday?.name}
                    </h2>
                    <h3 className="text-2xl text-emerald-800 font-light">
                      {new Date(birthday?.birthday).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </h3>
                  </div>
                  <h3 className="text-xl bg-lime-200 border border-lime-600 text-lime-600 font-semibold rounded-sm shadow-inner p-3">
                    {birthday?.age}
                  </h3>
                </div>
                <div className="flex items-center justify-center min-h-28 bg-gradient-to-tl from-lime-400 to-lime-200 shadow-inner">
                  <p className="text-lg text-green-600 font-extrabold text-center">
                    {birthday?.greeting_message}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
