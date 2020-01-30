import React, { Component } from 'react';
import {
    checkEmailAvailability,
    checkUsernameAvailability,
    editprofile,
    getUserProfile,

} from '../../util/APIUtils';
import {Avatar, notification} from 'antd';
import {Button, Modal, Form, Input } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import {
    CONTACTNO_MAX_LENGTH, CONTACTNO_MIN_LENGTH, EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH
} from "../../constants";


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                name: {
                    value: ''
                },
                username: {
                    value: ''
                },
                email: {
                    value: ''
                },
                password: {
                    value: ''
                },
                contactno:{
                    value:''
                }
            }
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleEdit = this.handleEdit.bind(this);
            this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
            this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
            this.isFormInvalid = this.isFormInvalid.bind(this);
        }
        handleInputChange(event, validationFun) {
            const target = event.target;
            const inputName = target.name;
            const inputValue = target.value;

            this.setState({
                [inputName] : {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            });
        }
        handleEdit(event) {
            event.preventDefault();

            const editRequest = {
                name: this.state.name.value,
                email: this.state.email.value,
                username: this.state.username.value,
                password: this.state.password.value,
                contactno:this.state.contactno.value
            };

            editprofile(editRequest)
                .then(response => {
                    notification.success({
                        message: 'Foodie App',
                        description: "Saved",
                    });
                    this.props.history.push("/login");
                }).catch(error => {
                notification.error({
                    message: 'Foodie App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        }

        isFormInvalid() {
            return !(this.state.name.validateStatus === 'success' &&
                this.state.username.validateStatus === 'success' &&
                this.state.email.validateStatus === 'success' &&
                this.state.contactno.validateStatus === 'success'&&
                this.state.password.validateStatus === 'success'
            );
        }

        render() {
            const { visible, onCancel, onCreate } = this.props;
            return (
                <Modal
            visible={visible}
            title="Edit Profile"
            okText="Update"
            onCancel={onCancel}
            onOk={onCreate}
                >
                <Form layout="vertical" onSubmit={this.handleSubmit} className="signup-form">
                <Form.Item
            label="Full Name"
            validateStatus={this.state.name.validateStatus}
            help={this.state.name.errorMsg}>
        <Input
            size="large"
            name="name"
            autoComplete="off"
            placeholder=" Full name"
            value={this.state.name.value}
            onChange={(event) => this.handleInputChange(event, this.validateName)} />
            </Form.Item>

            <Form.Item label="Username"
            hasFeedback
            validateStatus={this.state.username.validateStatus}
            help={this.state.username.errorMsg}>
        <Input
            size="large"
            name="username"
            autoComplete="off"
            placeholder="A unique username"
            value={this.state.username.value}
            onBlur={this.validateUsernameAvailability}
            onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
            </Form.Item>

            <Form.Item
            label="Email"
            hasFeedback
            validateStatus={this.state.email.validateStatus}
            help={this.state.email.errorMsg}>
        <Input
            size="large"
            name="email"
            type="email"
            autoComplete="off"
            placeholder="Your email"
            value={this.state.email.value}
            onBlur={this.validateEmailAvailability}
            onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
            </Form.Item>

            <Form.Item
            label="Password"
            validateStatus={this.state.password.validateStatus}
            help={this.state.password.errorMsg}>
        <Input
            size="large"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Should 6 to 20 characters"
            value={this.state.password.value}
            onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
            </Form.Item>
            <Form.Item
            label="Contact No"
            validateStatus={this.state.contactno.validateStatus}
            help={this.state.contactno.errorMsg}>
        <Input
            size="large"
            name="contactno"
            autoComplete="off"
            placeholder=" Contact No"
            value={this.state.contactno.value}
            onChange={(event) => this.handleInputChange(event, this.validateContactno)} />
            </Form.Item>



            </Form>
            </Modal>
        );
        }

        validateName = (name) => {
            if(name.length < NAME_MIN_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
                }
            } else if (name.length > NAME_MAX_LENGTH) {
                return {
                    validationStatus: 'error',
                    errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
                }
            } else {
                return {
                    validateStatus: 'success',
                    errorMsg: null,
                };
            }
        }

        validateEmail = (email) => {
            if(!email) {
                return {
                    validateStatus: 'error',
                    errorMsg: 'Email may not be empty'
                }
            }

            const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
            if(!EMAIL_REGEX.test(email)) {
                return {
                    validateStatus: 'error',
                    errorMsg: 'Email not valid'
                }
            }

            if(email.length > EMAIL_MAX_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
                }
            }

            return {
                validateStatus: null,
                errorMsg: null
            }
        }

        validateUsername = (username) => {
            if(username.length < USERNAME_MIN_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
                }
            } else if (username.length > USERNAME_MAX_LENGTH) {
                return {
                    validationStatus: 'error',
                    errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
                }
            } else {
                return {
                    validateStatus: null,
                    errorMsg: null
                }
            }
        }

        validateUsernameAvailability() {
            // First check for client side errors in username
            const usernameValue = this.state.username.value;
            const usernameValidation = this.validateUsername(usernameValue);

            if(usernameValidation.validateStatus === 'error') {
                this.setState({
                    username: {
                        value: usernameValue,
                        ...usernameValidation
                    }
                });
                return;
            }

            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'validating',
                    errorMsg: null
                }
            });

            checkUsernameAvailability(usernameValue)
                .then(response => {
                    if(response.available) {
                        this.setState({
                            username: {
                                value: usernameValue,
                                validateStatus: 'success',
                                errorMsg: null
                            }
                        });
                    } else {
                        this.setState({
                            username: {
                                value: usernameValue,
                                validateStatus: 'error',
                                errorMsg: 'This username is already taken'
                            }
                        });
                    }
                }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
        }

        validateEmailAvailability() {
            // First check for client side errors in email
            const emailValue = this.state.email.value;
            const emailValidation = this.validateEmail(emailValue);

            if(emailValidation.validateStatus === 'error') {
                this.setState({
                    email: {
                        value: emailValue,
                        ...emailValidation
                    }
                });
                return;
            }

            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'validating',
                    errorMsg: null
                }
            });

            checkEmailAvailability(emailValue)
                .then(response => {
                    if(response.available) {
                        this.setState({
                            email: {
                                value: emailValue,
                                validateStatus: 'success',
                                errorMsg: null
                            }
                        });
                    } else {
                        this.setState({
                            email: {
                                value: emailValue,
                                validateStatus: 'error',
                                errorMsg: 'This Email is already registered'
                            }
                        });
                    }
                }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
        }

        validatePassword = (password) => {
            if(password.length < PASSWORD_MIN_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
                }
            } else if (password.length > PASSWORD_MAX_LENGTH) {
                return {
                    validationStatus: 'error',
                    errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
                }
            } else {
                return {
                    validateStatus: 'success',
                    errorMsg: null,
                };
            }
        }



        validateContactno = (contactno) => {
            if(contactno.length < CONTACTNO_MIN_LENGTH) {
                return {
                    validateStatus: 'error',
                    errorMsg: `Contact number is incorrect`
                }
            } else if (contactno.length > CONTACTNO_MAX_LENGTH) {
                return {
                    validationStatus: 'error',
                    errorMsg: `Contact number is incorrect`
                }
            } else {
                return {
                    validateStatus: 'success',
                    errorMsg: null,
                };
            }
        }



    },
);


class Profile extends Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        // const tabBarStyle = {
        //     textAlign: 'center'
        // };

        return (
            <div className="profile">
        {
            this.state.user ? (
            <div className="user-profile">
            <div className="user-details">
            <div className="user-avatar">
            <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
        {this.state.user.name[0].toUpperCase()}
    </Avatar>
        </div>
        <div className="user-summary">
            <div className="full-name">{this.state.user.name}</div>
        <div className="username">@{this.state.user.username}</div>
        <div className="contactno">Contact Number : {this.state.user.contactno}</div>

        <div className="email">E-mail :{this.state.user.email}</div>
        </div>

        <div>
        <Button type="primary" onClick={this.showModal}>
        Edit Profile
        </Button>
        <CollectionCreateForm
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onCreate={this.handleCreate}
        />

        </div>
        </div>
        </div>
    ): null
    }
    </div>
    );
    }
}


export default Profile;