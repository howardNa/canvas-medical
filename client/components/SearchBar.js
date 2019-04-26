import React from "react";

import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Search from "@material-ui/icons/Search";

const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <TextField
            id="input-with-icon-grid"
            label="What would you like to search?"
            onChange={props.handleChange}
            onKeyPress={props.handleSearch}
            style={{ width: 350, color: "orange" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBar;
