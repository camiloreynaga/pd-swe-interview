# Software Engineer (Node)

## Take-home Task

This task is intended to take 1 hour. We are looking for an indication of your thought process outside of an interview context, not a comprehensive and in-depth solution. We’ll discuss your responses in the next stage of the interview along with any points you haven’t had time to cover. If you find yourself spending longer than one hour, please note down what you would do if you had more time and we will discuss it in the next interview – do not worry about finishing.

When you have completed your solution, please push the code to Github, and send the repository URL to daisy@producersdirect.org. If the project is private, please also add `cjol` as a project collaborator. Feel free to ask any questions or clarifications at any time.

Please do not use an LLM or code-generation tools (e.g. ChatGPT) for this exercise. We want to evaluate your software engineering expertise, not ChatGPT’s!

We are looking to evaluate:
- Your approach to feature implementation
- Your ability to write idiomatic Typescript code
- Your understanding of software development best practices
- The way you choose development priorities


## Problem statement
Our organisation is building a new data integration. Data will be sent to our API in a plaintext format. We need to store this data and be able to retrieve it on-demand later. The API will be written in TypeScript with Express.
You are tasked with implementing the storage and retrieval logic through two API endpoints:

- `POST /data` — this endpoint will receive data in a plaintext data format. Each line represents one reading, which consists of a farmer ID, a farmer attribute, and an attribute value. The attribute value will be a valid JSON scalar type (`string`, `boolean` or `number`). Not all readings will be available for all farmers, and not all readings for a single farmer may be provided in a single API call.
  ```
  16499 Name "John Doe"
  16499 Country "Uganda"
  16499 PlotCount 4
  16499 TotalFarmSize 13
  ```
  ​
  The API should parse this data, store it to the database and return { "success": true } to the client. If the data is malformed, the API should return { "success": false } without storing anything in the database.

- `GET /aggregate?country=Uganda&attributes=PlotCount,TotalFarmSize` — this endpoint should receive two parameters. The first, `Country`, should filter the database so that only readings from farmers in the given country are returned. In this example, farmers in `Kenya` should be excluded from the aggregate. The second, `attributes`, is a comma-separated list of values to aggregate. For each attribute provided in the request, the `min`, `max`, `sum` and `count` of all readings within the country should be calculated and returned to the client. If a non-numeric attribute is requested, it should be ignored and excluded from the response.

  The result of an API call might look like this:
  ```json
  {
    "attributes": {
      "PlotCount": {
        "min": 1,
        "max": 10,
        "sum": 61,
        "count": 12
      },
      "TotalFarmSize": {
        "min": 5,
        "max": 13,
        "sum": 78,
        "count": 10
      },
    }
  }
  ```

​
## Codebase
The current API code can be found here: https://github.com/cjol/pd-swe-interview. You can click the “Use this template” button in the Github interface to create your own copy of the repository to work on.

A basic API scaffolding has already been provided, which you are free to extend as you see fit. Please install additional libraries if you think they are appropriate. For simplicity, data must be stored in-memory using the implementation in `database.ts`. Please do not use an external database (e.g. PostgreSQL) for this exercise, because we would like to see your choice of data structures. Delegating these design decisions to the database implementation is normally a good idea, but sidesteps the interesting interview questions! Beyond this, please feel free to change this implementation to suit whatever data structure you would like to use.

## Sample Requests
To test your implementation, you may like to use these sample requests:

### Add Data
```sh
curl --request POST \
  --url http://localhost:3000/data \
  --header 'Content-Type: text/plain' \
  --data '16499 Name "John Doe"
16499 Country "Uganda"
16499 PlotCount 4
16499 TotalFarmSize 13
16500 Country "Kenya"
16500 PlotCount 1
16501 PlotCount 12
```
​
### Add Data (malformed)
```sh
curl --request POST \
  --url http://localhost:3000/data \
  --header 'Content-Type: text/plain' \
  --data '16499 Name "John Doe"
16499 14
```
​
### Get Data
```sh
curl --request GET \
    --url 'http://localhost:3000/aggregate?country=Uganda&attributes=PlotCount,TotalFarmSize`
```
​
## Additional Considerations
- How can we test the code to be confident in the implementation?
- How can we make sure this code is easy to maintain for future developers?
- Our API needs to be high-performance — how can we measure the performance of our API?
- How could we optimise this code if the API receives many more POST requests than GET requests? What about if the API receives many more GET requests than POST requests?