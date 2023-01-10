export function countPics(limit) {
  //checks the local storage for an already existing object, and creates it if it doesn't exist
  let picCount = JSON.parse(localStorage.getItem("picCount"));
  if (picCount === null) {
    localStorage.setItem(
      "picCount",
      JSON.stringify({
        refDate: new Date().toLocaleDateString(),
        count: 1,
      })
    );
  }

  //the day of reference will be compared to today's date
  //if they are equal, the count will work towards the limit in increments of 1, then stop
  //as the days preogress, refDay is refreshed and the count reset
  let today = new Date().toLocaleDateString();

  if (picCount.refDate === today && picCount.count < limit) {
    picCount.count++;
    localStorage.setItem("picCount", JSON.stringify(picCount));
  } else if (picCount.refDate < today) {
    picCount.refDate = new Date().toLocaleDateString();
    picCount.count = 0;
    localStorage.setItem("picCount", JSON.stringify(picCount));
  } else {
    return false;
  }
}
