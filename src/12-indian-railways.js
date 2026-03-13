/**
 * 🚂 IRCTC Tatkal Reservation System
 *
 * IRCTC ka simplified reservation system bana! Passengers ka list hai,
 * trains ka list hai with available seats. Har passenger ko uski preferred
 * class mein seat dene ki koshish kar. Agar nahi mili, toh fallback class
 * try kar. Agar woh bhi nahi, toh waitlist kar de.
 *
 * Train object structure:
 *   { trainNumber: "12345", name: "Rajdhani Express",
 *     seats: { sleeper: 3, ac3: 2, ac2: 1, ac1: 0 } }
 *
 * Passenger object structure:
 *   { name: "Rahul", trainNumber: "12345",
 *     preferred: "ac3", fallback: "sleeper" }
 *
 * Rules (use nested loops):
 *   - Process passengers in order (FIFO - first come first served)
 *   - For each passenger:
 *     1. Find the train matching trainNumber
 *     2. Try preferred class first: if seats > 0, allocate (decrement seat count)
 *        Result: { name, trainNumber, class: preferred, status: "confirmed" }
 *     3. If preferred not available, try fallback class
 *        Result: { name, trainNumber, class: fallback, status: "confirmed" }
 *     4. If neither available, waitlist the passenger
 *        Result: { name, trainNumber, class: preferred, status: "waitlisted" }
 *     5. If train not found, result:
 *        { name, trainNumber, class: null, status: "train_not_found" }
 *   - Seats are MUTATED: when a seat is allocated, decrement the count
 *     so later passengers see updated availability
 *
 * Validation:
 *   - Agar passengers ya trains array nahi hai ya empty hai, return []
 *
 * @param {Array<{name: string, trainNumber: string, preferred: string, fallback: string}>} passengers
 * @param {Array<{trainNumber: string, name: string, seats: Object<string, number>}>} trains
 * @returns {Array<{name: string, trainNumber: string, class: string|null, status: string}>}
 *
 * @example
 *   railwayReservation(
 *     [{ name: "Rahul", trainNumber: "12345", preferred: "ac3", fallback: "sleeper" }],
 *     [{ trainNumber: "12345", name: "Rajdhani", seats: { sleeper: 5, ac3: 0, ac2: 1, ac1: 0 } }]
 *   )
 *   // ac3 has 0 seats, try fallback sleeper (5 seats), allocated!
 *   // => [{ name: "Rahul", trainNumber: "12345", class: "sleeper", status: "confirmed" }]
 */
export function railwayReservation(passengers, trains) {
  // Your code here
  if (
    !Array.isArray(passengers) ||
    passengers.length == 0 ||
    !Array.isArray(trains) ||
    trains.length == 0
  ) {
    return [];
  }
  let finalList = [];
  for (const each of passengers) {
    let check = false;
    for (const train of trains) {
      if (each.trainNumber === train.trainNumber) {
        let { name, trainNumber, preferred, fallback } = each;
        let preferredCheck = false;
        switch (preferred) {
          case "sleeper":
            if (train.seats.sleeper > 0) {
              finalList.push({
                name,
                trainNumber,
                class: "sleeper",
                status: "confirmed",
              });
              train.seats.sleeper--;
              preferredCheck = true;
            }
            break;
          case "ac3":
            if (train.seats.ac3 > 0) {
              finalList.push({
                name,
                trainNumber,
                class: "ac3",
                status: "confirmed",
              });
              train.seats.ac3--;
              preferredCheck = true;
            }
            break;
          case "ac2":
            if (train.seats.ac2 > 0) {
              finalList.push({
                name,
                trainNumber,
                class: "ac2",
                status: "confirmed",
              });
              train.seats.ac2--;
              preferredCheck = true;
            }
            break;
          case "ac1":
            if (train.seats.ac1 > 0) {
              finalList.push({
                name,
                trainNumber,
                class: "ac1",
                status: "confirmed",
              });
              train.seats.ac1--;
              preferredCheck = true;
            }
            break;
        }
        if (preferredCheck === false) {
          switch (fallback) {
            case "sleeper":
              if (train.seats.sleeper > 0) {
                finalList.push({
                  name,
                  trainNumber,
                  class: "sleeper",
                  status: "confirmed",
                });
                train.seats.sleeper--;
              } else {
                finalList.push({
                  name,
                  trainNumber,
                  class: preferred,
                  status: "waitlisted",
                });
              }
              break;
            case "ac3":
              if (train.seats.ac3 > 0) {
                finalList.push({
                  name,
                  trainNumber,
                  class: "ac3",
                  status: "confirmed",
                });
                train.seats.ac3--;
              } else {
                finalList.push({
                  name,
                  trainNumber,
                  class: preferred,
                  status: "waitlisted",
                });
              }
              break;
            case "ac2":
              if (train.seats.ac2 > 0) {
                finalList.push({
                  name,
                  trainNumber,
                  class: "ac2",
                  status: "confirmed",
                });
                train.seats.ac2--;
              } else {
                finalList.push({
                  name,
                  trainNumber,
                  class: preferred,
                  status: "waitlisted",
                });
              }
              break;
            case "ac1":
              if (train.seats.ac1 > 0) {
                finalList.push({
                  name,
                  trainNumber,
                  class: "ac1",
                  status: "confirmed",
                });
                train.seats.ac1--;
              } else {
                finalList.push({
                  name,
                  trainNumber,
                  class: preferred,
                  status: "waitlisted",
                });
              }
              break;
          }
        }
        check = true;
        break;
      }
    }
    if (check === false) {
      finalList.push({
        name: each.name,
        trainNumber: each.trainNumber,
        class: null,
        status: "train_not_found",
      });
    }
  }
  return finalList;
}
