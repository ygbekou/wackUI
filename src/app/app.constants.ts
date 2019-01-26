export class Constants {
  public static apiServer = 'http://localhost:8080';
  // public static apiServer = 'http://54.234.246.22:8080';

  public static DETAIL = 'Details';
  public static ABSENCES = 'Absenses';
  public static ACTIF = 'Active';
  public static ACTIVE = 'Active?';
  public static ADD_IMAGE = 'Ajouter Image';
  public static ADD_LABEL = 'Add';
  public static CLEAR_LABEL = 'Clear';
  public static CLOSE_LABEL = 'Close';
  public static SAVE_LABEL = 'Save';
  public static DELETE_LABEL = 'Delete';
  public static DEPARTMENT = 'Department';
  public static DOCTOR = 'Doctor';
  public static COUNTRY = 'Country';
  public static ROLE = 'Role';
  public static SELECT_OPTION = 'Select Option';

  public static FEMALE = 'Femme';
  public static MALE = 'Homme';
  public static USER_SEARCH_PARTS = 'Entrez le nom et/ou le prenom';
  public static NO_USER_FOUND = 'Aucune personne trouvee';
  public static COUNTRY_ORIGIN = 'Pays d\'origine';
  public static COUNTRY_RESIDENCE = 'Pays de Residence';

  public static FILE_UPLOADED = 'Fichier charge';

  public static ALIVE = 'Vivant';
  public static DEAD = 'Decede';
  public static MISSING_REQUIRED_FIELD = 'Veuillez remplir tous les champs requis';
  public static ERROR_OCCURRED = 'Une erreur systeme s\'est produite';
  public static SAVE_UNSUCCESSFUL = 'La sauvegarde n\'a pas marche. Verifiez tous les champs.';
  public static SAVE_SUCCESSFUL = 'La sauvegarde a marche.';
  public static ORDERING_DOCTOR_REQUIRED = 'The Ordering Doctor and the Priority and Received Date is required.';
  public static DOCTOR_ORDER_MEDICINE_REQUIRED = 'For Pharmacy order type at least one medicine is required.';
  public static DOCTOR_ORDER_LABORATORY_REQUIRED = 'For Laboratory order type at least one lab test/group is required.';
  public static DIAGNOSIS_REQUIRED = 'Diagnosis is required.';

  public static SEND_ME_MY_PASSWORD = 'Envoyez-moi mon mot de passe';

  public static I_AM_MEMBER = 'Je suis membre';
  public static I_AM_SUBSCRIBE = 'Je m\'inscris';
  public static INVALID_USER_PASS = 'Nom d\'utilisateur et/ou mot de passe invalide';
  public static PROJECT = 'Projet';
  public static SELECT_PROJECT = 'Selectioner le projet';

  public static PASSWORD_NOT_SENT = 'Le mot de passe n\'a pu etre envoye. Assurez-vous que vous avez entre un E-mail valide';
  public static PASSWORD_SENT = 'Le mot de passe vous a ete envoye a l\'addresse: ';
  public static LOCALE = 'fr-FR';

  public static CATEGORY_MEDICINE = 1;
  public static CATEGORY_BED = 2;
  public static CATEGORY_SERVICE_TARIF = 6;

  public static USER_GROUP_PATIENT = 20;

  public static DOCTOR_ORDER_TYPE_PHARM = 1;
  public static DOCTOR_ORDER_TYPE_LAB = 2;

  public static DOCTOR_ORDER_STATUS_PENDING = 1;
  public static DOCTOR_ORDER_STATUS_PENDING_NAME = 'PENDING';
  public static DOCTOR_ORDER_STATUS_INPROGRESS = 2;
  public static DOCTOR_ORDER_STATUS_INPROGRESS_NAME = 'INPROGRESS';
  public static DOCTOR_ORDER_STATUS_COMPLETED = 3;
  public static DOCTOR_ORDER_STATUS_COMPLETED_NAME = 'COMPLETED';
  public static DOCTOR_ORDER_STATUS_CLOSED = 4;
  public static DOCTOR_ORDER_STATUS_CLOSED_NAME = 'CLOSED';

  public static ACTIVITIES_PACKAGE = 'com_qkcare_model_activities_';
  public static BIRTH_REPORT_CLASS = Constants.ACTIVITIES_PACKAGE + 'BirthReport';
  public static DEATH_REPORT_CLASS = Constants.ACTIVITIES_PACKAGE + 'DeathReport';

  // Growl severities
  public static SUCCESS = 'success';
  public static INFO = 'info';
  public static WARN = 'warn';
  public static ERROR = 'error';
}
