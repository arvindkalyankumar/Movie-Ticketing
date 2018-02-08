const formatDate = (date: Date) => {
    return date.toString().split('T')[0];
};

export { formatDate }