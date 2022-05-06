/* https://www.convertcsv.com/csv-to-json.htm --> could play around with different formats
https://golf.procon.org/met-values-for-800-activities/
*/

import React from "react";

function AddActivityView() {
  return (
    <div>
      <span>
        <input
          className="search-bar"
          name="add-activity-search-bar"
          type="text"
          placeholder="Search for an activity"
          // onChange={onSearchChange}
        />
      </span>
    </div>
  );
}

export default AddActivityView;
