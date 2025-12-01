import { useEffect, useState } from 'react';
import {
	Alert,
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { ActivityIndicator, Appbar, FAB } from 'react-native-paper';
import AddProductModal from './components/AddProductModal';
import ProductItem from './components/ProductItem';
import TotalSummary from './components/TotalSummary';
import {
	addProduct,
	deleteProduct,
	markAsPurchased,
	subscribeToProducts,
	updateProduct
} from './services/productService';
import { theme } from './styles/theme';

export default function App() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	// Subscreve aos produtos no Firestore
	useEffect(() => {
		const unsubscribe = subscribeToProducts((fetchedProducts) => {
			setProducts(fetchedProducts);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// Adiciona ou edita produto
	const handleSaveProduct = async (product) => {
		try {
			if (editingProduct) {
				await updateProduct(editingProduct.id, product);
			} else {
				await addProduct(product);
			}
			setEditingProduct(null);
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível salvar o produto');
		}
	};

	// Abre modal para editar
	const handleEditProduct = (product) => {
		setEditingProduct(product);
		setModalVisible(true);
	};

	// Deleta produto com confirmação
	const handleDeleteProduct = (id) => {
		Alert.alert(
			'Confirmar exclusão',
			'Deseja realmente excluir este produto?',
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Excluir',
					style: 'destructive',
					onPress: async () => {
						try {
							await deleteProduct(id);
						} catch (error) {
							Alert.alert('Erro', 'Não foi possível excluir o produto');
						}
					}
				}
			]
		);
	};

	// Marca/desmarca como comprado
	const handleTogglePurchased = async (id, comprado) => {
		try {
			await markAsPurchased(id, comprado);
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível atualizar o produto');
		}
	};

	// Abre modal para adicionar novo produto
	const handleOpenAddModal = () => {
		setEditingProduct(null);
		setModalVisible(true);
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
				<Text style={styles.loadingText}>Carregando produtos...</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

			{/* Header */}
			<Appbar.Header style={styles.header}>
				<Appbar.Content
					title="SmartMarket"
					titleStyle={styles.headerTitle}
				/>
			</Appbar.Header>

			{/* Resumo da Compra */}
			<TotalSummary products={products} />

			{/* Lista de Produtos */}
			{products.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>
						Nenhum produto na lista
					</Text>
					<Text style={styles.emptySubtext}>
						Toque no + para adicionar produtos
					</Text>
				</View>
			) : (
				<FlatList
					data={products}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ProductItem
							product={item}
							onEdit={handleEditProduct}
							onDelete={handleDeleteProduct}
							onTogglePurchased={handleTogglePurchased}
						/>
					)}
					contentContainerStyle={styles.listContainer}
				/>
			)}

			{/* Modal de Adicionar/Editar */}
			<AddProductModal
				visible={modalVisible}
				onClose={() => {
					setModalVisible(false);
					setEditingProduct(null);
				}}
				onSave={handleSaveProduct}
				editingProduct={editingProduct}
			/>

			{/* Botão Flutuante de Adicionar */}
			<FAB
				icon="plus"
				style={styles.fab}
				onPress={handleOpenAddModal}
				color={theme.colors.surface}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background
	},
	header: {
		backgroundColor: theme.colors.primary,
		elevation: 4
	},
	headerTitle: {
		color: theme.colors.surface,
		fontSize: theme.fontSize.xxlarge,
		fontWeight: 'bold'
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.background
	},
	loadingText: {
		marginTop: theme.spacing.md,
		fontSize: theme.fontSize.medium,
		color: theme.colors.textSecondary
	},
	listContainer: {
		paddingBottom: 80
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing.xl
	},
	emptyText: {
		fontSize: theme.fontSize.xlarge,
		color: theme.colors.textSecondary,
		textAlign: 'center',
		marginBottom: theme.spacing.sm
	},
	emptySubtext: {
		fontSize: theme.fontSize.medium,
		color: theme.colors.textSecondary,
		textAlign: 'center'
	},
	fab: {
		position: 'absolute',
		margin: theme.spacing.md,
		right: 0,
		bottom: 0,
		backgroundColor: theme.colors.primary
	}
});
