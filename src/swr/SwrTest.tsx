import useSWR from "swr";

export function SwrTest() {
  const { data, mutate } = useSWR("/SwrTest");

  return {
    swrTestValue: data,
    setSwrTestValue: mutate,
  };
}
