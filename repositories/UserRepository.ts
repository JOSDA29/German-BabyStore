import db from '../config/config-db';
import User from '../Dto/UserDto';
class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO user (email_u, name_u, lastname_u, phone_number_u , password_u) VALUES (?, ?, ?, ?, ?)';
        const values = [user.email, user.nombres, user.apellidos, user.telefono, user.password];        return db.query(sql, values);
    }

    static async findByEmail(email: string): Promise<User | null> {
        const sql = 'SELECT password_u FROM user WHERE email_u = ?';
        const values = [email];
        const [rows] = await db.query(sql, values);

        if (Array.isArray(rows) && rows.length > 0) {
            const userData = rows[0];
        }
        return null;
    }
}


export default UserRepository;