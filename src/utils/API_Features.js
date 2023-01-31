class API_Features {
  constructor(doc, userQuery) {
    this.doc = doc;
    this.userQuery = userQuery;
  }

  filter() {
    const availableSimpleKeys = ["type"];
    const nestedKeys = ["city", "country", "destination", "minPrice"];

    const userQueryKeys = Object.keys(this.userQuery);

    let queryToExecute = {};

    userQueryKeys
      .filter((key) => availableSimpleKeys.includes(key))
      .forEach((key) => (queryToExecute[key] = this.userQuery[key]));

    if (userQueryKeys.some((key) => nestedKeys.includes(key))) {
      const locationQuery = {};
      userQueryKeys
        .filter((key) => nestedKeys.includes(key))
        .map((key) => {
          if (key === "city") return { "location.city": this.userQuery.city };
          else if (key === "country")
            return { "location.country": this.userQuery.country };
          else if (key === "destination")
            return {
              $or: [
                { "location.city": this.userQuery.destination.split(" ") },
                { "location.country": this.userQuery.destination.split(" ") },
              ],
            };
          else if (key === "minPrice")
            return { "minPrice.price": this.userQuery.minPrice };
        })
        .forEach((query) =>
          Object.keys(query).forEach((key) => (locationQuery[key] = query[key]))
        );

      queryToExecute = {
        ...queryToExecute,
        ...locationQuery,
      };
    }

    const modifiedQuery = JSON.parse(
      JSON.stringify(queryToExecute).replace(
        /^gt|gte|lt|lte/g,
        (match) => `$${match}`
      )
    );

    this.doc.find(modifiedQuery);

    return this;
  }
}

module.exports = API_Features;
