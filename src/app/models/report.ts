

export class Report {
  id:               number;
  name:             string;
  description:      string;
  status:           boolean;
}

export class Parameter {
  id:               number;
  name:             string;
  displayName:      string;
  dataType:         string;
  inputType:        string; 
  parameterSql:     string;
  parameterValues:  string;
  size:             string;
  maxLength:        string;
  value:            string;
  values:           Value[];
}

export class ReportView {
  reportName:       string;
  reportId:number;
  parameters:       Parameter[];
}

export class ReportCategory {
  categoryName:       string;
  reports:            Report[];
}

export class Value {
  code:     string;
  value:    string;
}
