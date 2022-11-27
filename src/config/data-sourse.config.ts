import { DataSource } from "typeorm";
import { dataSourceOptions } from "./data-sourse-options.config";

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
