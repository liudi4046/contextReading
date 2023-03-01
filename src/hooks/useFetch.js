import React, { useEffect, useState } from "react"

export default function useFetch(url, method = "GET", body = null) {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const options = { method }
        if (body) {
          options.body = JSON.stringify(body)
          options.headers = {
            "content-type": "application/json",
          }
        }
        const res = await fetch(url, options)
        const data = await res.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [url, method, body])

  return { data, error, loading }
}
