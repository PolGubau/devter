export default function useInternet(arrayToComplete) {
  let doYouHaveConnection
  arrayToComplete.length === 0
    ? (doYouHaveConnection = true)
    : (doYouHaveConnection = false)

  return doYouHaveConnection
}
