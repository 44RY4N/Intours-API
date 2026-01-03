class APIFeatures {
  constructor(queryObj, queryString) {
    this.queryObj = queryObj;
    this.queryString = queryString;
    this.tempObj = { ...queryString };
  }
  filter() {
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    excludedFields.forEach((el) => delete this.tempObj[el]);
    this.queryObj = this.queryObj.find(this.tempObj);
    return this;
  }
  // always chain before filter
  search() {
    if (this.queryString.search) {
      this.tempObj.$or = [
        { State: { $regex: this.queryString.search, $options: 'i' } },
        { City: { $regex: this.queryString.search, $options: 'i' } },
        { Name: { $regex: this.queryString.search, $options: 'i' } },
      ];
    }
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortQ = this.queryString.sort.split(',').join(' ');
      this.queryObj = this.queryObj.sort(sortQ);
    }
    return this;
  }
  fieldLimit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.queryObj = this.queryObj.select(fields);
    }
    return this;
  }
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    this.queryObj = this.queryObj.skip((page - 1) * limit).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
