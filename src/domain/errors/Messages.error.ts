export const ErrorMessage = {
  //Auth
  passwordIncorrect: "A001: Email or password incorrect, check credentials",
  passwordNotSecure:
    "A002: Password is not secure,you must have a letter, a capital letter, a number and a special character ",
  jwtNoCreated: "A003: Could not create jwt, try again later",
  jwtNoUpdated: "A004: Could not update token, try again later",
  jwtNoFound: "A005: Does not exist token",
  passwordNotUpdated: "A006: Password not updated, try again later",
  accountBlockedTemporarily : "A007: Your account has been blocked temporarily, please try again later after 30 minutes",
  passwordExpired:  "A008: Your password has expired, please change it",
  accountInactive: "A014: Your account is inactive, please contact the admin to activate it",

  //Tokens
  ExpiredToken: "J001:The token is not valid or has expired",
  InvalidToken: "J002: The token is invalid, check its structure",
  notAuthorized: "J003: You are not authorized to perform the requested action",
  tokenUsed: "J004: Token already used, please generate a new one",

  //Taxes
  taxNotFound: "T001: No taxes found",
  taxNotUpdated: "T002: Taxes not updated",
  existsTax: "T003: Value and name already exists",
  taxValueNotValid: "T004: Value must be more than 0",
  taxIsExcent: "T005: Excento must have a value of 0",

  //TaxTypes
  taxTypesExist: "T006: Name and code already exists",

  //PaymentTypes
  paymentTypeNotFound: "PT01: No payment types found",
  paymentTypeNotUpdated: "PT02: Payment types not updated",
  existsPaymentType: "PT03: Value and name already exists",

  //Products
  productNotFound: "P001: No products found",
  productNotUpdated: "P002: Products not updated",
  nameProductExists: "P003: Name already exists",
  existsProduct: "P004: Value and name already exists",
  productWioutImages:
    "P005: No images were uploaded, you must upload at least one image",
  productKeyNotFound: "P006: Product key not found",
  productCodeRequired: "P006: Product code is required",
  nameOrCodeExists: "P007: Name or code already exists",

  //ProductTaxes
  productTaxNotFound: "P008: Product tax not found",

  //Permissions
  permissionAlreadyExists:
    "A007: Permission with this role, module and action already exists",
  permissionNotFound: "A008: Permission not found",

  //Role
  roleNotFound1: "R001: Role not found",
  roleNameExists: "R002: Role name already exists",
  roleNotUpdated: "R003: Role not updated",

  //Modulos
  moduleNotFound: "A009: Module not found",

  //Los que ya tiene Deivid jaja
  phoneRepeated: "U001: Phone number already exists",
  emailRepeated: "U002: Email already exists",
  emailNotFound: "U003: There is no user with this email",
  roleNotFound: "U004: Could not parse the role correctly",
  tokenNotFound: "U005: Token does not exist",

  //Inventory
  productInventoryFound: "I001: The product already has an inventory",
  productInventoryNotFound: "I002: Product inventory not found",
  inventoryNoUpdated: "I003: Inventory not updated",

  //Inventory Movements
  inventoryMovementsNotFound: "I004: Inventory movements not found",
  inventoryMovementsExceeds: "I005: There is not enough output material",

  //User
  userNotFound: "U006: User not found",
  doctorNotFound: "U007: Doctor not found",
  configDoctorNotFound: "U008: Doctor configuration not found",
  serviceDoctorNotFound: "U009: Service configuration not found",

  //Regex
  notNumber: "I001: The amount must be only numbers",

  //Branches
  branchNotFound: "M001: Branch not found",
  branchNameExists: "M002: Data duplicated, check the name",
  branchNotUpdated: "M003: Branch not updated",
  onlyOneAdmin: "M004: Only one admin is allowed",
  branchPhoneExists:  "M005: The phone number is alredy used",
  branchCodeExists : "M006: The code is alredy used",
  branchEmailExists: "M007: The email is alredy used",

  //Modules
  moduleNameExists: "M006: Module name already exists",
  moduleNotUpdated: "M007: Module not updated",

  //Order
  clientNotFound: "O001: The client no exist",
  orderNotFound: "O002: Order not found",
  orderNotUpdate: "O003: Order not update",
  discountTypeRequired:
    "O004: If you send a discount you need to specify what type it is.",
  discountRequired:
    "O005: If you send a type of discount you need to specify the value of it.",
  userOrderNotFound: "O006: User order not found",
  OrderShipping: "O007: You need to specify how you will pick up the order and only one method per order.",
  //Payment
  paymentNotFound: "PT04: Payment not found",

  //Cart
  cartNotFound: "C001: Cart not found, check your user",
  cartNotUpdate: "C002: Cart not update",
  cartNotDelete: "C003: Cart not delete, check if it is empty",

  //Purchase Order
  purchaseOrderNotFound: "PO01: Purchase Order not found, check if is valid id",
  purchaseOrderNotUpdated: "PO02: Purchase Order not updated",
  purchaseProductNotFound: "PO03: Purchase Product not found, check if is registered",
  purchaseProductLimit: "PO04: You can not receive more than the quantity ordered",


  //Suplier
  supplierAlreadyExists: "S001: Supplier already exists, check your email or phone number",
  supplierNotCreated: "S002: Supplier not created, try again later",
  supplierNotExists: "S003: Supplier not exists",
  rfcInvalid: "S004: RFC is not valid, check the format",
  regimeNotFound: "S005: Regime not related to the cfdi",


  //Services
  serviceNotFound: "S006: Service not found",
  serviceNotUpdated: "S007: Service not updated",
  existsService: "S008: Name already exists",
  existServiceCode: "S009: Code alredy exists",
  categoryServiceNotFound: "  S010: Category selected not found, try other",
  discountErrorServices : "S011: If you send a discount, you need to specify the amount",
  serviceAlreadyAssigned: "S012: Service already assigned to this doctor",
  noConfigDoctor: "S013: No configuration doctor found",


  //ScheduleCatalogue
  nameExistSchedule: "S014: Name already exists",
  scheduleNotFound: "S015: Schedule not found",
  scheduleNotUpdated: "S016: Schedule not updated",

  //Category
  CategoryNotFound: "C011: Category not found",

  //Appointment
  appoinmentNotFound: "A009: Appointment not found",
  appointmentPending: "A010: You cannot delete an configuration with pending appointments",


  //Employee
  employeeNotFound: "E001: Employee not found",
  deppartmentNotFound: "E002: Department not found",
  employeeNoUpdated: "E003: Employee not updated",
  regimeEmployeeNotFound: "E004: Regime not found",
  timeInvalid: "E005: Time invalid, check the format EJ: 14:00",
  timeInvalid2: "E006: Time invalid, the start time must be less than the end time",
  dateInvalid: "E007: Date invalid, check the format EJ: 2022-01-01T14:00:00.000Z",

  // Department
  departmentNotFound: "D001: Department not found",
  departmentNoUpdated: "D002: Department not updated",
  nameExistDepartment: "D003: Name already exists",


  //ScheduleEmployee
  scheduleEmployeeNotFound: "SC01: Schedule not found",
  scheduleEmployeeNoUpdated: "SC02: Schedule not updated",
  nameExistScheduleEmployee: "SC03: Schedule already exists",

  //ScheduleRecord 
  scheduleRegisterAlreadyExists: "SC04: Schedule register already exists",
  employeeRecordNotFound : "SC05: Employee record not found",
  employeeHourRepeat: "SC06: You have already registered this hour",
  employeeHourMany: "SC07: You have more than 4 hours registered",


  //Tolerance
  toleranceNotFound: "TO01: Tolerance not found",
  toleranceNoUpdated: "TO02: Tolerance not updated",
  nameExistTolerance: "TO03: Tolerance already exists",
  toleranceExceed: "TO04: Only one tolerance is allowed",

  //Seller
  sellerNotFound: "SO01: Seller not found",


  //Type payroll concept
  typePayrollConceptNotFound: "TP01: Type payroll concept not found",
  typePayrollConceptNoUpdated: "TP02: Type payroll concept not updated",
  existsTypePayrollConcept: "TP03: Name already exists",
  typePayrollConceptNameExists: "TP04: Name already exists",

  //Payroll concept
  PayrollConceptNotFound: "PC01: Payroll concept not found",
  PayrollConceptNoUpdated: "PC02: Payroll concept not updated",
  existsPayrollConcept: "PC03: Name already exists",
  PayrollConceptNameExists: "PC04: Name already exists",

  //Employee concept
  EmployeeConceptNotFoundEmployeeConcept: "EC01: Employee concept not found",
  EmployeeConceptNoUpdatedEmployeeConcept: "EC02: Employee concept not updated",
  existsEmployeeConcept: "EC03: Name already exists",
  EmployeeConceptNameExists: "EC04: Name already exists",


  //Frecuency Catalog
  FrequencyCatalogNotFound: "FC01: Frequency Catalog not found",
  FrequencyCatalogNoUpdated: "FC02: Frequency Catalog not updated",
  existsFrequencyCatalog: "FC03: Name already exists",
  FrequencyCatalogNameExists: "FC04: Name already exists",

  //Product Custom
  ProductCustomNotFound: "PC01: Product Custom not found",
  ProductCustomNoUpdated: "PC02: Product Custom not updated",
  ProductCustomNameExists: "PC03: Name already exists",
  ProductCustomOptionExists: "PC04: Name already exists",
  ProductCustomOptionNotFound: "PC05: Product Custom Option not found",
  ProductCustomOptionNoUpdated: "PC06: Product Custom Option not updated",
  CustomNotFound: "PC07: Custom not found",
  CustomNoUpdated: "PC08: Custom not updated",
  CustomNameExists: "PC09: Name already exists",
  CustomDiscountTypeNotFound: "PC10: Discount type not found",
  
  //Disocunts
  NameDiscountExist: "DI01: Name already exists",
  DiscountNotFound: "DI02: Discount not found",
  DiscountNotUpdated: "DI03: Discount not updated",
  DiscountExceed: "DI04: Discount exceed, check the discount",

  //CustomOptions
  CustomOptionNotFound: "CO01: Custom option not found",
  CustomOptionNotUpdated: "CO02: Custom option not updated",
  CustomOptionExceed: "CO03: Custom option exceed, check the custom option",
  customNotFound: "CO04: Custom not found",

  AddressAlreadyExists: "AD001: Address already exists, exactly the same",
  AddressNotFound: "AD002: Address not found, check the id",
  AddressNotUpdated: "AD003: Address not updated, try again later",


  ZipCodeInvalid: "The postal code must only have numbers",
  LatitudeInvalid: "The latitude must only have numbers",
  LongitudeInvalid: "The longitude must only have numbers",

  //Boxes
  BoxesAlreadyExists: "The box already exists",
  BoxesNameAlreadyExists: "The box name is already in use",  
  BoxesNotFound: "The box does not exist",
  NumberNotValid : "Only whole numbers and decimals are allowed.",

  //PLAYABLE CHARACTERS
  PlayableCharacterNotFound: 'The Playable Character you looked for does not exist.',

  //Deafult
  error: "Idk what happened",
};
