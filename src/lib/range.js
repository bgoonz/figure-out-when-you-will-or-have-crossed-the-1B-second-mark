
function range(start, stop) {
  const nums = [start];
  let curr = start;
  while (curr < stop) {
    nums.push(curr += 1);
  }
  return nums;
}

export { range };
